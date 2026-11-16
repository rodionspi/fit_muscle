"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AlertTriangle, MousePointer2, Move3d } from "lucide-react";
import { Spinner } from "@/components/custom/Feedback";

const MODEL_URL = "/models/muscle_man.glb";
// Matches --card in globals.css so the canvas blends into the page.
const SCENE_BACKGROUND = 0x0f1117;
const FLOOR_Y = -0.72;
const MODEL_HEIGHT = 1.8;

type LoadState = { status: "loading"; progress: number } | { status: "ready" } | { status: "error" };

const isMesh = (object: THREE.Object3D): object is THREE.Mesh => (object as THREE.Mesh).isMesh === true;

const disposeMaterial = (material: THREE.Material | THREE.Material[]) => {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }
  material.dispose();
};

const ThreeDView = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<LoadState>({ status: "loading", progress: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SCENE_BACKGROUND);
    scene.fog = new THREE.Fog(SCENE_BACKGROUND, 7, 13);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 1, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0, 0);
    controls.minDistance = 2.2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI * 0.9;

    // Studio rig: soft ambient, a shadow-casting key, a teal rim for the brand and a cool fill.
    scene.add(new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.45));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x5eead4, 0.9);
    rimLight.position.set(-2, 1.2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.35);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const floorGeometry = new THREE.CircleGeometry(3.4, 64);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x151925, roughness: 0.95 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = FLOOR_Y;
    floor.receiveShadow = true;
    scene.add(floor);

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        const model = gltf.scene;

        // Normalise unknown model sizes: scale to MODEL_HEIGHT and stand it on the floor
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = MODEL_HEIGHT / size.y;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y = (size.y * scale) / 2 + FLOOR_Y;

        model.traverse((child) => {
          if (isMesh(child)) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
        setState({ status: "ready" });
      },
      (event) => {
        if (event.total > 0) {
          setState({ status: "loading", progress: Math.round((event.loaded / event.total) * 100) });
        }
      },
      (error) => {
        console.error("Failed to load the 3D model:", error);
        setState({ status: "error" });
      }
    );

    let frameId = 0;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // The canvas sits in a tab, so its size changes without a window resize
    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      controls.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      scene.traverse((child) => {
        if (isMesh(child)) {
          child.geometry.dispose();
          disposeMaterial(child.material);
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-[#0f1117] shadow-card">
      <div
        ref={containerRef}
        className="h-[min(72vh,720px)] min-h-[420px] w-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D muscle model"
        role="img"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <div className="glass rounded-xl border px-3.5 py-2.5">
          <p className="eyebrow">Anatomical model</p>
          <p className="mt-1 text-sm font-medium">Rotate, zoom, inspect</p>
        </div>
        <div className="glass hidden items-center gap-3 rounded-xl border px-3.5 py-2.5 text-xs text-muted-foreground sm:flex">
          <span className="inline-flex items-center gap-1.5">
            <MousePointer2 className="h-3.5 w-3.5" />
            Drag to rotate
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Move3d className="h-3.5 w-3.5" />
            Scroll to zoom
          </span>
        </div>
      </div>

      {state.status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0f1117]/85 backdrop-blur-sm">
          <Spinner />
          <div className="text-center">
            <p className="text-sm font-medium">Loading the 3D model</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {state.progress > 0 ? `${state.progress}% - ` : ""}this can take a moment on a slow connection
            </p>
          </div>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-[width] duration-300"
              style={{ width: `${state.progress}%` }}
            />
          </div>
        </div>
      )}

      {state.status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0f1117]/90 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-2 text-amber-300">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium">The model could not be loaded</p>
          <p className="max-w-xs text-xs text-muted-foreground">
            Check your connection and reload the page. The grid and list views still work without it.
          </p>
        </div>
      )}
    </div>
  );
};

export default ThreeDView;
