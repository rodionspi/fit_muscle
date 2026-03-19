import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const isMesh = (object: THREE.Object3D): object is THREE.Mesh => {
    return (object as THREE.Mesh).isMesh === true;
};

const disposeMeshMaterial = (material: THREE.Material | THREE.Material[]) => {
    if (Array.isArray(material)) {
        material.forEach((mat: THREE.Material) => mat.dispose());
        return;
    }
    material.dispose();
};

const ThreeDView = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0b1220"); // Dunkler Hintergrund beibehalten

        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 1, 4.2); // Kamera-Position beibehalten

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        // --- 1. SCHATTEN AKTIVIEREN FÜR REALISMUS ---
        // Dies ist der Schlüssel, um die Muskeln wie im Bild hervorzuheben.
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sanfte Schatten
        
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.target.set(0, 0, 0);
        controls.minDistance = 2.2;
        controls.maxDistance = 8;
        controls.maxPolarAngle = Math.PI * 0.9;

        // --- 2. BELEUCHTUNG FÜR MUSKEL-DEFINITION ---
        // Ein Studio-Beleuchtungs-Setup, das Schatten wirft und Highlights setzt.

        const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.4);
        scene.add(hemiLight);

        // Die Haupt-Lichtquelle, die Schatten wirft (key light)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Erhöhte Intensität
        directionalLight.position.set(2, 5, 4); // Positioniert, um Schatten unter den Muskeln zu werfen
        directionalLight.castShadow = true; // Aktiviert Schattenwerfen
        
        // Schatten-Einstellungen für bessere Qualität
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -5;
        directionalLight.shadow.camera.right = 5;
        directionalLight.shadow.camera.top = 5;
        directionalLight.shadow.camera.bottom = -5;
        scene.add(directionalLight);

        // Subtiles Fülllicht für die Rückseite
        const backLight = new THREE.DirectionalLight(0x9cc7ff, 1.0);
        backLight.position.set(-2, 1, -3);
        scene.add(backLight);

        // --- 3. DER BODEN (BEIBEHALTEN, ABER SCHATTEN EMPFANGEND) ---
        const floorGeometry = new THREE.CircleGeometry(3.4, 48);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x111827,
            roughness: 0.92,
        });
        const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.position.y = -0.72; // Boden tiefer gesetzt
        floorMesh.receiveShadow = true; // Empfängt Schatten des Modells
        scene.add(floorMesh);

        // --- 4. DAS MUSKELMODELL LADEN ---
        const loader = new GLTFLoader();
        
        // PLATZHALTER-PFAD: Ändere dies zu deiner tatsächlichen Modelldatei.
        const modelUrl = "/models/muscle_man.glb"; 

        loader.load(
            modelUrl,
            (gltf) => {
                const modelScene = gltf.scene;

                // --- MODELL-OPTIMIERUNGEN ---
                // a) Skalierung & Zentrierung (unvorhersehbare Modellgrößen handhaben)
                const box = new THREE.Box3().setFromObject(modelScene);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());

                // Modell skalieren, um in die Szene zu passen (angenommen, es ist zu groß oder klein)
                const desiredHeight = 1.8; // Zielhöhe in Metern
                const scaleFactor = desiredHeight / size.y;
                modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);

                // Modell zentrieren
                modelScene.position.sub(center.multiplyScalar(scaleFactor));
                // Positionierung in der Szene, passend zur Kamera und zum Boden
                modelScene.position.y = size.y * scaleFactor / 2 - 0.72; 

                // b) Materialien und Schatten
                modelScene.traverse((child) => {
                    if (isMesh(child)) {
                        child.castShadow = true; // Jedes Teil wirft Schatten
                        child.receiveShadow = true; // Jedes Teil empfängt Schatten
                        // Stellen Sie sicher, dass das Material PBR-kompatibel ist (Standard in GLTF)
                        // und nicht zu glänzend oder dunkel ist.
                    }
                });

                scene.add(modelScene);
                setIsLoading(false); // Ladezustand beenden

                console.log("Muskelmodell erfolgreich geladen!");
            },
            // Fortschritts-Callback (optional)
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Fehler-Callback
            (error) => {
                console.error("Fehler beim Laden des Modells:", error);
                setIsLoading(false); // Ladezustand beenden
            }
        );

        // --- 5. AUFRÄUMEN UND UNMOUNTING (Verbessert) ---
        const disposableObjects: (THREE.BufferGeometry | THREE.Material)[] = [
            floorGeometry,
            floorMaterial
        ];

        let frameId = 0;
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsed = clock.getElapsedTime();
            
            // Die spezifischen Teil-Rotationen (Arm, Bein, Kopf) sind weg,
            // da wir jetzt ein einzelnes geladenes Modell haben, nicht eine Gruppe von Primitiven.

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
            
            // Dispose alle statischen Geometrien/Materialien
            disposableObjects.forEach((obj) => obj.dispose());
            
            // Dispose das geladene Modell (muss traversiert werden)
            scene.traverse((child) => {
                if (isMesh(child)) {
                    child.geometry.dispose();
                    disposeMeshMaterial(child.material);
                }
            });

            renderer.dispose();
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ height: "700px", width: "100%", position: "relative" }}
            className="rounded-xl border border-slate-700 overflow-hidden"
        >
            {isLoading && (
                <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    color: "white", fontSize: "1.2rem", textAlign: "center", zIndex: 10
                }}>
                    Lade fotorealistisches Muskelmodell...
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Dies kann einen Moment dauern.</p>
                </div>
            )}
        </div>
    );
};

export default ThreeDView;