import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { motion } from "framer-motion";
import { RotateCw, Layers as LayersIcon, Loader2 } from "lucide-react";

const LAYER_DEFS = [
  { color: "#f5f2ea", h: 0.35 },
  { color: "#3a2f4f", h: 0.55 },
  { color: "#1f6f6a", h: 0.4 },
  { color: "#c9c2b4", h: 0.5 },
  { color: "#141414", h: 0.7 },
];

// Real brand model. Falls back to a procedural mattress if it fails to load.
const GLB_URL = "/models/mattress.glb";

export default function ThreeShowcase() {
  const mountRef = useRef(null);
  const explodedRef = useRef(false);
  const pivotRef = useRef(null);
  const targetsRef = useRef([]);
  const usingGlbRef = useRef(false);
  const [exploded, setExploded] = useState(false);
  const [usingGlb, setUsingGlb] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.2, 3.2, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // Environment for realistic PBR reflections on the GLB
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(5, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff9d1f, 1.1);
    rim.position.set(-6, 3, -4);
    scene.add(rim);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.ShadowMaterial({ opacity: 0.35 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.6;
    ground.receiveShadow = true;
    scene.add(ground);

    // Pivot group (floats up/down)
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivotRef.current = pivot;

    // --- Procedural fallback mattress ---
    const procedural = new THREE.Group();
    const w = 4.2;
    const d = 2.6;
    let y = -1.2;
    const targets = [];
    LAYER_DEFS.forEach((L, i) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, L.h, d),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(L.color),
          roughness: 0.85,
          metalness: 0.05,
        }),
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const baseY = y + L.h / 2;
      mesh.position.y = baseY;
      mesh.userData.baseY = baseY;
      mesh.userData.explodeY = baseY + i * 0.95;
      procedural.add(mesh);
      targets.push(mesh);
      y += L.h + 0.002;
    });
    pivot.add(procedural);
    targetsRef.current = targets;

    // --- Try to load the real GLB ---
    const loader = new GLTFLoader();
    loader.load(
      GLB_URL,
      (gltf) => {
        pivot.remove(procedural);
        procedural.traverse((o) => {
          if (o.isMesh) {
            o.geometry.dispose();
            o.material.dispose();
          }
        });
        targetsRef.current = [];

        const model = gltf.scene;
        model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 4.4 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        pivot.add(model);

        usingGlbRef.current = true;
        setUsingGlb(true);
        setLoading(false);
      },
      undefined,
      () => {
        // Keep procedural fallback
        setLoading(false);
      },
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 1.0;
    controls.minPolarAngle = Math.PI / 4.5;
    controls.maxPolarAngle = Math.PI / 1.9;
    controls.target.set(0, 0, 0);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!usingGlbRef.current) {
        targetsRef.current.forEach((m) => {
          const goal = explodedRef.current
            ? m.userData.explodeY
            : m.userData.baseY;
          m.position.y += (goal - m.position.y) * 0.08;
        });
      }
      if (pivotRef.current)
        pivotRef.current.position.y = Math.sin(t * 0.8) * 0.06;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const wpx = mount.clientWidth;
      const hpx = mount.clientHeight;
      camera.aspect = wpx / hpx;
      camera.updateProjectionMatrix();
      renderer.setSize(wpx, hpx);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleExplode = () => {
    explodedRef.current = !explodedRef.current;
    setExploded(explodedRef.current);
  };

  return (
    <section
      data-testid="three-showcase-section"
      className="relative bg-void px-6 md:px-12 py-28 md:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              Interactive · 3D
            </span>
            <h2 className="mt-6 font-display text-5xl md:text-6xl font-light uppercase leading-[0.9] text-white">
              See It From
              <br />
              Every Angle
            </h2>
            <p className="mt-6 max-w-sm text-base font-light text-zinc-400">
              Drag to rotate the Shreeram mattress and inspect it from every
              side — the real, engineered build that cradles you nightly.
            </p>
            <div className="mt-10 flex items-center gap-4">
              {!usingGlb && (
                <button
                  type="button"
                  onClick={toggleExplode}
                  data-testid="three-explode-toggle"
                  className="group inline-flex items-center gap-3 rounded-full border border-gold/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-void"
                >
                  <LayersIcon className="h-4 w-4" />
                  {exploded ? "Collapse Layers" : "Explode Layers"}
                </button>
              )}
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <RotateCw className="h-4 w-4" /> Drag to spin
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              ref={mountRef}
              data-testid="three-canvas"
              className="relative h-[52vh] md:h-[68vh] w-full rounded-2xl border border-white/10 bg-gradient-to-b from-coal to-void cursor-grab active:cursor-grabbing"
            >
              {loading && (
                <div
                  data-testid="three-loading"
                  className="absolute inset-0 flex items-center justify-center gap-3 text-zinc-400"
                >
                  <Loader2 className="h-5 w-5 animate-spin text-gold" />
                  <span className="text-xs uppercase tracking-[0.3em]">
                    Loading model
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
