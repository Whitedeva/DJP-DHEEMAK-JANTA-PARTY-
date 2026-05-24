import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Rotate3d, Compass, RefreshCw, ZoomIn } from "lucide-react";

export default function FlagSimulation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [controlsInstance, setControlsInstance] = useState<OrbitControls | null>(null);

  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Configuration
  const FLAG_WIDTH = 4.5;
  const FLAG_HEIGHT = 3;
  const SEGMENTS_X = 80;
  const SEGMENTS_Y = 60;

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 300;
    const height = mountRef.current.clientHeight || 300;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7f4ed, 8, 20);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.id = "flag-simulation-canvas";
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.95);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // 5. Procedural Texture Generation (Canvas 2D)
    const createIndianFlagTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 684;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const w = canvas.width;
        const h = canvas.height;
        const bandHeight = h / 3;

        // Saffron Band
        ctx.fillStyle = "#FF9933";
        ctx.fillRect(0, 0, w, bandHeight);

        // White Band
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, bandHeight, w, bandHeight);

        // Green Band
        ctx.fillStyle = "#138808";
        ctx.fillRect(0, bandHeight * 2, w, bandHeight);

        // Ashoka Chakra
        const cx = w / 2;
        const cy = h / 2;
        const radius = bandHeight * 0.42;

        ctx.strokeStyle = "#000080";
        ctx.fillStyle = "#000080";
        ctx.lineWidth = 4;

        // Outer circle
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
        ctx.stroke();

        // 24 Spokes
        for (let i = 0; i < 24; i++) {
          const angle = (i * Math.PI * 2) / 24;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.16, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const flagTexture = createIndianFlagTexture();

    // 6. Geometry & Material for the Flag
    const geometry = new THREE.PlaneGeometry(FLAG_WIDTH, FLAG_HEIGHT, SEGMENTS_X, SEGMENTS_Y);
    const material = new THREE.MeshStandardMaterial({
      map: flagTexture,
      side: THREE.DoubleSide,
      roughness: 0.72,
      metalness: 0.1,
    });

    const flagMesh = new THREE.Mesh(geometry, material);
    flagMesh.castShadow = true;
    flagMesh.receiveShadow = true;

    // Shift flag Mesh so the left edge acts as the pivot point (x = 0)
    flagMesh.position.x = FLAG_WIDTH / 2;

    // Clone original position attributes to safely perform physics waving deformation
    const originalPositions = geometry.attributes.position.clone();

    // 7. Flag Pole Setup
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, FLAG_HEIGHT * 2.8, 24);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.85,
      roughness: 0.22,
    });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    poleMesh.position.set(0, -FLAG_HEIGHT * 0.35, 0);
    poleMesh.castShadow = true;
    poleMesh.receiveShadow = true;

    // Pole Top Ornament (Sphere)
    const sphereGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, FLAG_HEIGHT * 1.05, 0);

    // Group the pole and flag elements
    const flagGroup = new THREE.Group();
    flagGroup.add(flagMesh);
    flagGroup.add(poleMesh);
    flagGroup.add(sphereMesh);

    // Shift group slightly to center nicely on the canvas
    flagGroup.position.set(-FLAG_WIDTH / 3, -0.4, 0);
    scene.add(flagGroup);

    // 8. OrbitControls & Simulation Clock
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 1.6;
    controls.enableZoom = true;
    setControlsInstance(controls);

    const clock = new THREE.Clock(true);
    clock.start();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime() || (performance.now() * 0.001);
      const positions = flagMesh.geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const origX = originalPositions.getX(i);
        const origY = originalPositions.getY(i);

        // Normalize x coordinate from 0 to 1 along the flag span
        const normalizedX = (origX + FLAG_WIDTH / 2) / FLAG_WIDTH;

        // Custom aerodynamic waving equations
        const windSpeed = 3.6;
        const waveFrequency = 1.8;
        const amplitude = Math.pow(normalizedX, 1.3) * 0.48;

        // Rolling primary sinusoidal wave
        const wave1 = Math.sin(normalizedX * waveFrequency * Math.PI - time * windSpeed) * amplitude;

        // Secondary cross ripples
        const wave2 = Math.sin(normalizedX * 8.0 - time * 5.2 + origY * 1.8) * (amplitude * 0.12);

        // Apply displacement inside vertex buffer object on Z axis
        positions.setZ(i, wave1 + wave2);

        // Mathematical material scrunching
        const scrunch = Math.cos(normalizedX * waveFrequency * Math.PI - time * windSpeed) * (amplitude * 0.18);
        positions.setX(i, origX - scrunch * normalizedX);
      }

      positions.needsUpdate = true;
      flagMesh.geometry.computeVertexNormals();

      // Implement subtle rotation if toggled
      if (isRotatingRef.current) {
        flagGroup.rotation.y = Math.sin(time * 0.15) * 0.22;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 300;
      const h = mountRef.current.clientHeight || 300;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(mountRef.current);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      flagTexture.dispose();
      poleGeo.dispose();
      poleMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  const resetCamera = () => {
    if (controlsInstance) {
      controlsInstance.object.position.set(0, 0.5, 7.5);
      controlsInstance.target.set(0, 0, 0);
      controlsInstance.update();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Simulation Stage Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      />

      {/* Floating Interactive HUD Header */}
      <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-djp-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-djp-green"></span>
          </span>
          <span className="text-[10px] font-mono font-bold text-djp-charcoal uppercase tracking-wider">
            3D Flag Engine
          </span>
        </div>

        <button
          onClick={resetCamera}
          className="pointer-events-auto p-2 rounded-xl bg-white/90 hover:bg-white border border-gray-100 text-gray-500 hover:text-djp-charcoal transition shadow-sm"
          title="Reset Camera Orientation"
        >
          <Compass className="h-4 w-4" />
        </button>
      </div>

      {/* Floating Instruction Overlay HUD Bottom */}
      <div className="relative z-10 p-4 mt-auto w-full flex flex-col sm:flex-row justify-between items-center gap-2 pointer-events-none">
        
        {/* Helper Instructions Label */}
        <div className="bg-djp-charcoal/80 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wide flex items-center space-x-2 select-none border border-white/10 shadow-md">
          <Rotate3d className="h-3 w-3 text-[#FF9933]" />
          <span>DRAG TO ROTATE • SCROLL TO ZOOM</span>
        </div>

        {/* Rotation toggle button */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="pointer-events-auto bg-white/90 hover:bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-mono font-bold text-gray-600 hover:text-djp-charcoal transition shadow-sm flex items-center space-x-1.5"
        >
          <RefreshCw className={`h-3 w-3 ${isRotating ? "animate-spin duration-3000" : ""}`} />
          <span>{isRotating ? "Auto Sway" : "Paused"}</span>
        </button>

      </div>
    </div>
  );
}
