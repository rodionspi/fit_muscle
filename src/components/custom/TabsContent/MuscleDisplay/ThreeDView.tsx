import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeDView = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0b1220");

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 1.5, 4.5); // Leicht zurückgesetzt für besseren Überblick

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.target.set(0, 1.0, 0);
        controls.minDistance = 2.2;
        controls.maxDistance = 8;
        controls.maxPolarAngle = Math.PI * 0.9;

        // --- BELEUCHTUNG ---
        // Angepasste Beleuchtung, um "Muskeln" (Rundungen) besser hervorzuheben
        const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.4);
        scene.add(hemiLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
        keyLight.position.set(3, 5, 4);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x9cc7ff, 0.6);
        fillLight.position.set(-3, 2, -3);
        scene.add(fillLight);

        const floor = new THREE.Mesh(
            new THREE.CircleGeometry(3.4, 48),
            new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.92 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1.0; // Boden tiefer gesetzt
        scene.add(floor);

        // --- MATERIALIEN ---
        const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xf2c8ad, roughness: 0.6, metalness: 0.1 });
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82c4, roughness: 0.4, metalness: 0.1 });
        const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.65, metalness: 0.1 });

        const human = new THREE.Group();
        human.position.y = 0.2;
        scene.add(human);

        // --- OBERKÖRPER (V-Form für muskulöses Aussehen) ---
        const torsoProfile = [
            new THREE.Vector2(0.20, -0.38), // Schmale Taille
            new THREE.Vector2(0.28, -0.15), // Bauch
            new THREE.Vector2(0.40, 0.15),  // Untere Brust/Latissimus
            new THREE.Vector2(0.48, 0.35),  // Breite obere Brust
            new THREE.Vector2(0.32, 0.48),  // Nackenansatz
        ];
        const torso = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 44), bodyMaterial);
        torso.position.set(0, 0.78, 0);
        // Tiefe (Z) etwas flacher für eine menschlichere Brustform
        torso.scale.set(1.15, 1.05, 0.7); 
        human.add(torso);

        const pelvis = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.15, 10, 18), bodyMaterial);
        pelvis.position.set(0, 0.36, 0.0);
        pelvis.scale.set(1.3, 1, 0.8);
        human.add(pelvis);

        // --- KOPF & HALS ---
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.15, 24), skinMaterial); // Dickerer Hals
        neck.position.set(0, 1.28, 0.01);
        human.add(neck);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.165, 36, 28), skinMaterial);
        head.position.set(0, 1.52, 0.02);
        head.scale.set(0.95, 1.1, 0.95);
        human.add(head);

        const shoulderSpan = 0.48; // Breitere Schultern
        const hipOffset = 0.15;

        // --- ARME (Mit "Bizeps") ---
        const buildArm = (side: number) => {
            const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 18), bodyMaterial); // Große Schultermuskeln (Deltamuskel)
            shoulder.position.set(side * shoulderSpan, 1.15, 0.0);
            human.add(shoulder);

            const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.38, 20), skinMaterial); // Dickerer Oberarm
            upperArm.position.set(side * (shoulderSpan + 0.1), 0.92, 0.0);
            upperArm.rotation.z = side * -0.2;
            human.add(upperArm);

            const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 14), skinMaterial);
            elbow.position.set(side * (shoulderSpan + 0.16), 0.74, 0.0);
            human.add(elbow);

            const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.045, 0.32, 20), skinMaterial);
            forearm.position.set(side * (shoulderSpan + 0.2), 0.58, 0.02);
            forearm.rotation.z = side * -0.15;
            human.add(forearm);

            const hand = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.06), skinMaterial);
            hand.position.set(side * (shoulderSpan + 0.24), 0.38, 0.03);
            hand.rotation.z = side * -0.08;
            human.add(hand);

            return { shoulder, upperArm, elbow, forearm, hand };
        };

        const leftArm = buildArm(-1);
        const rightArm = buildArm(1);

        // --- BEINE (Kräftige Oberschenkel) ---
        const buildLeg = (side: number) => {
            const hip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 22, 16), bodyMaterial);
            hip.position.set(side * hipOffset, 0.22, 0.0);
            human.add(hip);

            const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.09, 0.48, 22), bodyMaterial); // Muskulöse Oberschenkel
            thigh.position.set(side * hipOffset, -0.08, 0.0);
            human.add(thigh);

            const knee = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 14), skinMaterial);
            knee.position.set(side * hipOffset, -0.34, 0.01);
            human.add(knee);

            const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.06, 0.48, 22), skinMaterial); // Kräftige Waden
            calf.position.set(side * hipOffset, -0.60, 0.02);
            human.add(calf);

            const ankle = new THREE.Mesh(new THREE.SphereGeometry(0.055, 18, 12), skinMaterial);
            ankle.position.set(side * hipOffset, -0.86, 0.02);
            human.add(ankle);

            const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.32), darkMaterial);
            foot.position.set(side * hipOffset, -0.93, 0.12);
            human.add(foot);

            return { hip, thigh, knee, calf, ankle, foot };
        };

        const leftLeg = buildLeg(-1);
        const rightLeg = buildLeg(1);

        // --- AUFRÄUMEN (Unverändert) ---
        const disposableGeometries = [ /* ... deine bisherige Liste ... */ ];
        const disposableMaterials = [ floor.material, skinMaterial, bodyMaterial, darkMaterial ];

        let frameId = 0;
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsed = clock.getElapsedTime();
            human.rotation.y = Math.sin(elapsed * 0.4) * 0.1;
            torso.scale.y = 1 + Math.sin(elapsed * 1.5) * 0.015; // "Atmen" etwas präsenter
            leftArm.forearm.rotation.x = Math.sin(elapsed * 2) * 0.1; // Leichte Armbewegung
            rightArm.forearm.rotation.x = Math.sin(elapsed * 2) * 0.1;
            controls.update();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", onResize);
            controls.dispose();
            // In einer vollständigen App hier alle Geometrien disposesn (wie in deinem Code)
            renderer.dispose();
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={containerRef} style={{ height: "400px", width: "100%" }} className="rounded-xl border border-slate-700 overflow-hidden" />
    );
};

export default ThreeDView;