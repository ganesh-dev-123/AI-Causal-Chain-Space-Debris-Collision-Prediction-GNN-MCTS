import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Orbit, Eye, Zap, Layers } from 'lucide-react';

export default function OrbitalView({ selectedYear, setSelectedYear, selectedNode, onSelectDebris }) {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showRings, setShowRings] = useState(true);
  const [showChains, setShowChains] = useState(true);
  const playRef = useRef(isPlaying);
  playRef.current = isPlaying;

  const sceneRef = useRef(null);
  const earthMeshRef = useRef(null);
  const debrisGroupRef = useRef(null);
  const chainLinesRef = useRef(null);
  const orbitRingsGroupRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Generate dynamic 2D canvas texture for Earth
  const createEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep ocean base
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGradient.addColorStop(0, '#0a1638');
    oceanGradient.addColorStop(0.5, '#07102b');
    oceanGradient.addColorStop(1, '#050a1f');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Latitude & Longitude grid lines
    ctx.strokeStyle = 'rgba(30, 111, 217, 0.15)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Draw stylized vector continents
    ctx.fillStyle = '#1e3a6e';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1.5;

    const drawContinent = (points) => {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // North America approx
    drawContinent([[120, 80], [240, 70], [320, 140], [280, 240], [200, 250], [150, 180]]);
    // South America
    drawContinent([[260, 260], [330, 280], [350, 380], [290, 460], [250, 380]]);
    // Europe
    drawContinent([[480, 80], [580, 60], [600, 140], [520, 160], [470, 120]]);
    // Africa
    drawContinent([[480, 170], [600, 180], [620, 320], [540, 420], [470, 290]]);
    // Asia
    drawContinent([[600, 70], [860, 80], [900, 220], [750, 250], [640, 160]]);
    // Australia
    drawContinent([[780, 320], [880, 310], [910, 400], [810, 420]]);

    // Glowing equator line
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 256);
    ctx.lineTo(1024, 256);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.5, 7);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xddeeff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xfb8c00, 1.0);
    backLight.position.set(-5, -2, -5);
    scene.add(backLight);

    // 1. Earth Globe
    const earthGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: createEarthTexture(),
      roughness: 0.6,
      metalness: 0.1,
      bumpScale: 0.05
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Atmosphere Shroud Glow
    const atmosphereGeo = new THREE.SphereGeometry(2.12, 64, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x1e6fd9,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 2. Orbital Rings (LEO, MEO, GEO)
    const orbitRingsGroup = new THREE.Group();
    orbitRingsGroupRef.current = orbitRingsGroup;
    scene.add(orbitRingsGroup);

    const ringParams = [
      { radius: 2.6, color: 0x388bfd, name: 'LEO' },
      { radius: 3.3, color: 0x06b6d4, name: 'MEO' },
      { radius: 4.2, color: 0xfb8c00, name: 'GEO' }
    ];

    ringParams.forEach(ring => {
      const ringGeo = new THREE.RingGeometry(ring.radius - 0.02, ring.radius + 0.02, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ring.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      ringMesh.rotation.y = (Math.random() - 0.5) * 0.3;
      orbitRingsGroup.add(ringMesh);
    });

    // 3. Debris & Satellite Particles
    const debrisGroup = new THREE.Group();
    debrisGroupRef.current = debrisGroup;
    scene.add(debrisGroup);

    const particleCount = 450;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const debrisObjects = [];

    const colorRed = new THREE.Color(0xe53935);
    const colorOrange = new THREE.Color(0xfb8c00);
    const colorBlue = new THREE.Color(0x388bfd);
    const colorGreen = new THREE.Color(0x43a047);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      let c = colorBlue;
      if (i < 25) c = colorRed; // High collision risk debris
      else if (i < 70) c = colorOrange; // Medium risk
      else if (i < 120) c = colorGreen; // Active satellites

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      debrisObjects.push({ x, y, z, radius, theta, phi, speed: 0.002 + Math.random() * 0.005, type: i < 25 ? 'critical' : 'normal' });
    }

    const debrisGeo = new THREE.BufferGeometry();
    debrisGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    debrisGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const debrisMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const debrisPoints = new THREE.Points(debrisGeo, debrisMat);
    debrisGroup.add(debrisPoints);

    // 4. Red Collision Chains (Trajectories linking critical nodes)
    const chainLinesGroup = new THREE.Group();
    chainLinesRef.current = chainLinesGroup;
    scene.add(chainLinesGroup);

    // Define 4 critical nodes matching the prompt details
    const chainNodes = [
      { name: 'Satellite A', year: 2027, pos: new THREE.Vector3(2.5, 0.5, 1.2), color: 0xe53935 },
      { name: 'Debris F1', year: 2029, pos: new THREE.Vector3(1.8, 1.9, -0.8), color: 0xfb8c00 },
      { name: 'Debris G1', year: 2032, pos: new THREE.Vector3(-2.2, 1.1, -1.5), color: 0xfdd835 },
      { name: 'Satellite C', year: 2036, pos: new THREE.Vector3(-1.5, -2.1, 0.9), color: 0x43a047 }
    ];

    // Add glowing spheres for chain nodes
    chainNodes.forEach(node => {
      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: node.color });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(node.pos);
      chainLinesGroup.add(nodeMesh);
    });

    // Create curved arc trajectory lines between chain nodes
    for (let i = 0; i < chainNodes.length - 1; i++) {
      const start = chainNodes[i].pos;
      const end = chainNodes[i + 1].pos;
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(3.1);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const curveMat = new THREE.LineDashedMaterial({
        color: 0xe53935,
        linewidth: 2,
        scale: 1,
        dashSize: 0.1,
        gapSize: 0.05
      });
      const curveLine = new THREE.Line(curveGeo, curveMat);
      curveLine.computeLineDistances();
      chainLinesGroup.add(curveLine);
    }

    // Mouse Interaction / Drag Orbit
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const domElem = renderer.domElement;
    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      if (earthMeshRef.current) {
        earthMeshRef.current.rotation.y += deltaX * 0.005;
        earthMeshRef.current.rotation.x += deltaY * 0.005;
      }
      if (debrisGroupRef.current) {
        debrisGroupRef.current.rotation.y += deltaX * 0.005;
        debrisGroupRef.current.rotation.x += deltaY * 0.005;
      }
      if (chainLinesRef.current) {
        chainLinesRef.current.rotation.y += deltaX * 0.005;
        chainLinesRef.current.rotation.x += deltaY * 0.005;
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => { isDragging = false; };

    const handleWheel = (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.003;
      camera.position.z = Math.max(3.5, Math.min(12, camera.position.z));
    };

    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('wheel', handleWheel, { passive: false });

    // Render loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (earthMeshRef.current) {
        earthMeshRef.current.rotation.y += 0.0012;
      }
      if (debrisGroupRef.current) {
        debrisGroupRef.current.rotation.y += 0.002;
      }
      if (chainLinesRef.current) {
        chainLinesRef.current.rotation.y += 0.0012;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('wheel', handleWheel);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (domElem && domElem.parentElement) {
        domElem.parentElement.removeChild(domElem);
      }
    };
  }, []);

  // Handle Play/Pause Auto Progression of Year
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedYear(prev => {
          if (prev >= 2077) return 2027;
          return prev + 1;
        });
      }, 400 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, setSelectedYear]);

  // Toggle Visibility of Orbit Rings and Chain Lines
  useEffect(() => {
    if (orbitRingsGroupRef.current) orbitRingsGroupRef.current.visible = showRings;
  }, [showRings]);

  useEffect(() => {
    if (chainLinesRef.current) chainLinesRef.current.visible = showChains;
  }, [showChains]);

  return (
    <div className="glass-panel" style={{
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Quadrant Header */}
      <div style={{
        padding: '10px 16px',
        background: 'var(--bg-panel-header)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Orbit size={18} color="#388bfd" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            ORBITAL VIEW <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>(3D Real-Time Earth)</span>
          </span>
        </div>

        {/* Visibility Toggles */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setShowRings(!showRings)}
            style={{
              background: showRings ? 'rgba(30, 111, 217, 0.25)' : 'transparent',
              border: '1px solid var(--border-glass)',
              color: showRings ? '#60a5fa' : 'var(--text-muted)',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Layers size={12} />
            <span>Orbits</span>
          </button>
          <button
            onClick={() => setShowChains(!showChains)}
            style={{
              background: showChains ? 'rgba(229, 57, 53, 0.25)' : 'transparent',
              border: '1px solid var(--border-glass)',
              color: showChains ? '#ff6b6b' : 'var(--text-muted)',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Zap size={12} />
            <span>Chains</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div ref={containerRef} style={{ flex: 1, position: 'relative', width: '100%', cursor: 'grab' }}>
        {/* Overlay Overlay Telemetry Legend */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(7, 10, 26, 0.75)',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-glass)',
          fontSize: '0.72rem',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ color: 'var(--text-secondary)' }}>Target Epoch: <strong style={{ color: '#fff' }}>{selectedYear}</strong></div>
          <div style={{ color: 'var(--text-secondary)' }}>Tracked Satellites: <strong style={{ color: '#81c784' }}>3,420</strong></div>
          <div style={{ color: 'var(--text-secondary)' }}>Tracked Fragments: <strong style={{ color: '#ffb74d' }}>32,827</strong></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e53935' }}></span>
            <span style={{ color: '#ff6b6b' }}>Critical Chain Path A→F1→G1→C</span>
          </div>
        </div>
      </div>

      {/* Year Slider & Controls (Bottom) */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(10, 14, 39, 0.95)',
        borderTop: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        zIndex: 10
      }}>
        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: isPlaying ? 'rgba(251, 140, 0, 0.25)' : 'rgba(30, 111, 217, 0.25)',
            border: '1px solid var(--border-glass-bright)',
            color: isPlaying ? '#ffb74d' : '#60a5fa',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title={isPlaying ? "Pause Timeline" : "Play Timeline Animation"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Speed Toggle */}
        <button
          onClick={() => setSpeed(s => s === 1 ? 5 : s === 5 ? 10 : 1)}
          style={{
            background: 'rgba(16, 26, 56, 0.6)',
            border: '1px solid var(--border-glass)',
            color: '#fff',
            fontSize: '0.72rem',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)'
          }}
        >
          {speed}x
        </button>

        {/* Slider Label 2027 */}
        <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2027</span>

        {/* Year Slider */}
        <input
          type="range"
          min={2027}
          max={2077}
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          style={{
            flex: 1,
            accentColor: '#388bfd',
            cursor: 'pointer'
          }}
        />

        {/* Slider Label 2077 */}
        <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2077</span>

        {/* Selected Year Display Badge */}
        <div className="font-mono" style={{
          background: 'linear-gradient(135deg, rgba(30, 111, 217, 0.3) 0%, rgba(251, 140, 0, 0.2) 100%)',
          border: '1px solid var(--border-glass-bright)',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#60a5fa'
        }}>
          {selectedYear}
        </div>

        {/* Reset */}
        <button
          onClick={() => { setSelectedYear(2027); setIsPlaying(false); }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Reset to 2027"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
