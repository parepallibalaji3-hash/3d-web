import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Point, Points, Html } from '@react-three/drei';

// Helper for generating terrain noise
const generateHeight = (x, z) => {
  return (
    Math.sin(x * 0.15) * Math.cos(z * 0.15) * 1.5 +
    Math.sin(x * 0.4) * Math.sin(z * 0.4) * 0.4
  );
};

// 1. Terrain / Survey Scene (Re-themed to Red/Black/White)
export function SurveyTerrain({ active }) {
  const meshRef = useRef();
  const pointsRef = useRef();

  // Create geometry vertices with height noise
  const [positions, indices] = useMemo(() => {
    const size = 30;
    const segments = 30;
    const halfSize = size / 2;
    const step = size / segments;

    const vertices = [];
    const idxs = [];

    for (let i = 0; i <= segments; i++) {
      const z = i * step - halfSize;
      for (let j = 0; j <= segments; j++) {
        const x = j * step - halfSize;
        const y = generateHeight(x, z);
        vertices.push(x, y, z);
      }
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const row1 = i * (segments + 1);
        const row2 = (i + 1) * (segments + 1);

        idxs.push(row1 + j, row1 + j + 1, row2 + j);
        idxs.push(row1 + j + 1, row2 + j + 1, row2 + j);
      }
    }

    return [new Float32Array(vertices), new Uint32Array(idxs)];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Dynamic waving simulation for tech aesthetic
      const pos = meshRef.current.geometry.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const yBase = generateHeight(x, z);
        const yWave = Math.sin(t * 0.5 + x * 0.2 + z * 0.2) * 0.15;
        pos.setY(i, yBase + yWave);
      }
      pos.needsUpdate = true;
    }
    
    // Slow rotate
    if (meshRef.current) meshRef.current.rotation.y = t * 0.05;
    if (pointsRef.current) pointsRef.current.rotation.y = t * 0.05;
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Wireframe Mesh - Crimson Red */}
      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </bufferGeometry>
        <meshBasicMaterial 
          color="#d31211" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Lidar Point Cloud representation - White */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#ffffff" 
          size={0.06} 
          transparent 
          opacity={0.8} 
        />
      </points>

      {/* Simulated Total Station scanning beam */}
      <LaserSweep position={[0, 4, 0]} active={active} />
    </group>
  );
}

// Laser Sweep animation for Survey/Mapping
function LaserSweep({ position, active }) {
  const lineRef = useRef();

  useFrame((state) => {
    if (!active) return;
    const t = state.clock.getElapsedTime();
    if (lineRef.current) {
      // Rotate the laser scan beam
      lineRef.current.rotation.y = t * 1.5;
    }
  });

  return (
    <group position={position} ref={lineRef}>
      {/* Total station node - Red */}
      <mesh>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshBasicMaterial color="#d31211" />
      </mesh>
      {/* Laser lines pointing down - White/Silver */}
      <Line
        points={[[0, 0, 0], [0, -6, 2], [0, 0, 0], [0, -6, -2]]}
        color="#ffffff"
        lineWidth={1.5}
        transparent
        opacity={0.8}
      />
    </group>
  );
}

// 2. Construction / Scaffold Scene (Re-themed to Crimson Red/Black/White)
export function ConstructionScaffold({ active }) {
  const groupRef = useRef();
  const craneArmRef = useRef();
  const columnsRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
    if (craneArmRef.current) {
      craneArmRef.current.rotation.y = Math.sin(t * 0.8) * 0.5;
    }

    // Animate building pillars rising layer by layer
    columnsRefs.current.forEach((col, idx) => {
      if (col) {
        const offset = idx * 0.2;
        const scaleVal = Math.min(1, Math.max(0.1, Math.sin(t * 0.5 - offset) * 0.5 + 0.5));
        col.scale.y = scaleVal * 4; // max column height
        col.position.y = (scaleVal * 4) / 2 - 2; // offset from ground
      }
    });
  });

  // Structural columns positions
  const cols = [
    [-1.5, -1.5], [-1.5, 0], [-1.5, 1.5],
    [0, -1.5], [0, 0], [0, 1.5],
    [1.5, -1.5], [1.5, 0], [1.5, 1.5]
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Foundation grid - Red with dark gray lines */}
      <gridHelper args={[6, 6, '#d31211', '#222222']} position={[0, -2, 0]} />

      {/* Building concrete columns rising - White wireframe */}
      {cols.map((pos, idx) => (
        <mesh 
          key={idx} 
          ref={el => columnsRefs.current[idx] = el}
          position={[pos[0], -2, pos[1]]}
        >
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.45} />
        </mesh>
      ))}

      {/* Scaffold frames connecting columns - Crimson Red wireframe */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3.2, 3, 3.2]} />
        <meshBasicMaterial color="#d31211" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Construction Crane - Red and White */}
      <group position={[2.5, -2, 2.5]}>
        {/* Tower Base - White truss */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 5, 4]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        
        {/* Crane rotating arm */}
        <group position={[0, 5, 0]} ref={craneArmRef}>
          {/* Main Arm - Crimson Red */}
          <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.08, 0.08, 4, 4]} />
            <meshBasicMaterial color="#d31211" wireframe />
          </mesh>
          {/* Counter weight - Steel gray */}
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.12, 0.12, 1.2, 4]} />
            <meshBasicMaterial color="#555555" />
          </mesh>
          {/* Hanging hook line - White */}
          <Line
            points={[[-2.8, 0, 0], [-2.8, -3.5, 0]]}
            color="#ffffff"
            lineWidth={1}
          />
          {/* Load payload - Crimson Red */}
          <mesh position={[-2.8, -3.7, 0]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshBasicMaterial color="#d31211" wireframe />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// 3. Core Drilling Strata Scene - HIGH FIDELITY SOIL INVESTIGATION & TESTING
export function CoreDrilling({ active }) {
  const rigGroupRef = useRef();
  const drillStringRef = useRef();
  const sampleRef = useRef();
  const rotaryHeadRef = useRef();
  const laserRingRef = useRef();
  const particlesRef = useRef();

  // HTML Dashboard refs for direct DOM mutation (60fps performance)
  const phaseTextRef = useRef();
  const depthTextRef = useRef();
  const torqueTextRef = useRef();
  const rpmTextRef = useRef();
  const progressFillRef = useRef();
  const retrievalTextRef = useRef();
  const retrievalProgressFillRef = useRef();
  const scanPercentRef = useRef();
  const moistureTextRef = useRef();
  const strengthTextRef = useRef();
  const bearingTextRef = useRef();

  const phase1PanelRef = useRef();
  const phase2PanelRef = useRef();
  const phase3PanelRef = useRef();
  const phase4PanelRef = useRef();
  const dashboardCardRef = useRef();

  // Generate laser scan particles
  const scanParticles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.08 + Math.random() * 0.16;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -0.7 + Math.random() * 1.4; // relative height of sample cylinder (height = 1.4)
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (rigGroupRef.current) {
      // Very slow rotation of the overall view to show 3D details
      rigGroupRef.current.rotation.y = t * 0.06;
    }
    
    if (active) {
      // 16-second complete Soil Investigation drilling cycle:
      const cycleDuration = 16;
      const time = t % cycleDuration;
      
      let drillY = 2.0;
      let drillRotSpeed = 0;
      let sampleY = 1.0;
      let sampleOpacity = 0.0;
      let sampleScale = 0.01;
      
      let phase = 1;
      let phaseName = 'Initial Survey';
      let depth = 0;
      let torque = 0;
      let retrievalProgress = 0;
      let scanProgress = 0;

      if (time >= 0 && time < 6) {
        // Phase 1: Drilling Down through strata (0 - 6s)
        phase = 1;
        phaseName = 'Drilling & Sampling';
        const p = time / 6;
        drillY = 2.0 - p * 2.5; // descends from 2.0 to -0.5
        drillRotSpeed = 22;      // spinning fast
        depth = p * 15.0; // depth down to 15.0m
        torque = Math.floor(410 + Math.sin(t * 10) * 40 + Math.random() * 15);
        
        sampleY = 1.0;
        sampleOpacity = 0.0;
        sampleScale = 0.01;
      } 
      else if (time >= 6 && time < 10) {
        // Phase 2: Withdrawing Drill String containing core (6 - 10s)
        phase = 2;
        phaseName = 'Extracting Core';
        const p = (time - 6) / 4;
        drillY = -0.5 + p * 2.5; // ascends from -0.5 back to 2.0
        drillRotSpeed = 2;       // slow rotation as it withdraws
        retrievalProgress = p * 100;
        
        sampleY = 1.0;
        sampleOpacity = 0.0;
        sampleScale = 0.01;
      } 
      else if (time >= 10 && time < 14) {
        // Phase 3: Extracting soil core sample & Geotechnical Testing (10 - 14s)
        phase = 3;
        phaseName = 'Soil Lab Testing';
        const p = (time - 10) / 4;
        drillY = 2.0;            // stays at top
        drillRotSpeed = 0;       // stops spinning
        scanProgress = p * 100;
        
        // Sample lifts up out of top of drill pipe
        sampleY = 1.0 + p * 1.6; // rises from 1.0 to 2.6
        sampleOpacity = Math.min(1.0, p * 2.0); // fades in
        sampleScale = Math.min(1.0, p * 1.5); // scales up to full size
      } 
      else {
        // Phase 4: Resetting sampler (14 - 16s)
        phase = 4;
        phaseName = 'System Reset';
        const p = (time - 14) / 2;
        drillY = 2.0;
        drillRotSpeed = 0;
        
        sampleY = 2.6 - p * 1.6; // lowers back down
        sampleOpacity = 1.0 - p;  // fades out
        sampleScale = 1.0 - p;    // scales down
      }

      // Apply animated states to refs
      if (drillStringRef.current) {
        drillStringRef.current.position.y = drillY;
        drillStringRef.current.rotation.y = t * drillRotSpeed;
      }

      if (rotaryHeadRef.current) {
        // Rotary drive head sits on the mast track and moves vertically matching the drill string
        rotaryHeadRef.current.position.y = drillY + 0.8;
      }

      if (sampleRef.current) {
        sampleRef.current.position.y = sampleY;
        sampleRef.current.scale.set(sampleScale, sampleScale, sampleScale);
        
        // Slowly rotate extracted sample for 360 inspection
        sampleRef.current.rotation.y = t * 0.8;
        
        // Update opacity in materials (excluding dynamic scanner and particles which handle their own opacity)
        sampleRef.current.children.forEach(child => {
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = child.userData.baseOpacity !== undefined 
              ? child.userData.baseOpacity * sampleOpacity 
              : sampleOpacity;
          }
        });
      }

      // Animate Laser Scanning Ring in Phase 3
      if (laserRingRef.current) {
        if (phase === 3) {
          // Slide up and down the sample cylinder
          laserRingRef.current.position.y = Math.sin(t * 8) * 0.65;
          laserRingRef.current.scale.set(1, 1, 1);
        } else {
          laserRingRef.current.scale.set(0.001, 0.001, 0.001);
        }
      }

      // Animate Scanning Particles in Phase 3
      if (particlesRef.current) {
        if (phase === 3) {
          particlesRef.current.rotation.y = t * 2.0;
          particlesRef.current.scale.set(1, 1, 1);
          
          // Twinkle/jitter effect
          const positions = particlesRef.current.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * 0.0015;
            positions[i + 2] += (Math.random() - 0.5) * 0.0015;
          }
          particlesRef.current.geometry.attributes.position.needsUpdate = true;
        } else {
          particlesRef.current.scale.set(0.001, 0.001, 0.001);
        }
      }

      // Update HTML Dashboard values directly in DOM to avoid React performance lag
      if (dashboardCardRef.current) {
        dashboardCardRef.current.style.opacity = active ? '1' : '0';
      }
      if (phaseTextRef.current) phaseTextRef.current.innerText = phaseName;
      
      if (phase1PanelRef.current) phase1PanelRef.current.style.display = phase === 1 ? 'block' : 'none';
      if (phase2PanelRef.current) phase2PanelRef.current.style.display = phase === 2 ? 'block' : 'none';
      if (phase3PanelRef.current) phase3PanelRef.current.style.display = phase === 3 ? 'block' : 'none';
      if (phase4PanelRef.current) phase4PanelRef.current.style.display = phase === 4 ? 'block' : 'none';

      if (phase === 1) {
        if (depthTextRef.current) depthTextRef.current.innerText = depth.toFixed(1) + " m";
        if (torqueTextRef.current) torqueTextRef.current.innerText = torque + " Nm";
        if (rpmTextRef.current) rpmTextRef.current.innerText = Math.round(210 + Math.sin(t*5)*10) + " RPM";
        if (progressFillRef.current) progressFillRef.current.style.width = `${(depth / 15.0) * 100}%`;
      } 
      else if (phase === 2) {
        if (retrievalTextRef.current) retrievalTextRef.current.innerText = retrievalProgress.toFixed(0) + "%";
        if (retrievalProgressFillRef.current) retrievalProgressFillRef.current.style.width = `${retrievalProgress}%`;
      } 
      else if (phase === 3) {
        if (scanPercentRef.current) scanPercentRef.current.innerText = scanProgress.toFixed(0) + "%";
        
        // Dynamically update soil parameters based on scanProgress
        if (moistureTextRef.current) {
          const m = 14.2 + (scanProgress / 100) * 2.3;
          moistureTextRef.current.innerText = m.toFixed(1) + " %";
        }
        if (strengthTextRef.current) {
          const s = 115 + (scanProgress / 100) * 27;
          strengthTextRef.current.innerText = s.toFixed(0) + " kPa";
        }
        if (bearingTextRef.current) {
          const b = 230 + (scanProgress / 100) * 55;
          bearingTextRef.current.innerText = b.toFixed(0) + " kN/m²";
        }
      }
    }
  });

  // Strata geological cylinders - Stacked representing soil logging
  const layers = [
    { name: 'Loam / Silt', color: '#8d7a68', pos: -0.4, ht: 0.6 },
    { name: 'Dense Sand', color: '#d2b48c', pos: -1.0, ht: 0.6 },
    { name: 'Stiff Clay', color: '#b05a3e', pos: -1.6, ht: 0.6 },
    { name: 'Gravel / Cobbles', color: '#7e8a96', pos: -2.2, ht: 0.6 },
    { name: 'Hard Bedrock', color: '#3c424a', pos: -2.8, ht: 0.6 }
  ];

  return (
    <group ref={rigGroupRef}>
      {/* 1. Geological Earth Strata representation - Wireframe cylinders showing layers */}
      {layers.map((layer, idx) => (
        <mesh key={idx} position={[0, layer.pos, 0]}>
          <cylinderGeometry args={[2.3, 2.3, layer.ht, 24]} />
          <meshBasicMaterial 
            color={layer.color} 
            wireframe 
            transparent 
            opacity={0.35} 
          />
        </mesh>
      ))}

      {/* 2. Geotechnical Drill Rig Frame */}
      <group position={[0, -2.0, 0]}>
        {/* Foundation Base Platform - Deep Black and Crimson */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.5, 0.1, 1.5]} />
          <meshBasicMaterial color="#d31211" wireframe />
        </mesh>

        {/* Support mast columns - White wireframe */}
        <mesh position={[0.45, 2.5, 0]}>
          <boxGeometry args={[0.15, 4.8, 0.15]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh position={[-0.45, 2.5, 0]}>
          <boxGeometry args={[0.15, 4.8, 0.15]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>

        {/* Mast crown (header plate) - Crimson Red */}
        <mesh position={[0, 4.9, 0]}>
          <boxGeometry args={[1.1, 0.15, 0.4]} />
          <meshBasicMaterial color="#d31211" />
        </mesh>

        {/* Rotary Drive Head - Crimson sliding box on the mast */}
        <group ref={rotaryHeadRef} position={[0, 2.8, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.4, 0.5]} />
            <meshBasicMaterial color="#d31211" />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* 3. Drilling String & Cutting Bit assembly */}
        <group ref={drillStringRef} position={[0, 2.0, 0]}>
          {/* Heavy hex drill pipe - Silver/White */}
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 3.2, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          
          {/* Heavy Core Sampler Barrel - Steel Grey */}
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
            <meshBasicMaterial color="#888888" />
          </mesh>

          {/* Diamond-tipped core drill bit - Crimson Red */}
          <mesh position={[0, -1.35, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 12, 1]} />
            <meshBasicMaterial color="#d31211" />
          </mesh>
          <mesh position={[0, -1.43, 0]}>
            <coneGeometry args={[0.12, 0.08, 12]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
        </group>

        {/* 4. Extracted Geotechnical Soil Core Sample (Exposed in Phase 3) */}
        <group ref={sampleRef} position={[0, 1.0, 0]}>
          {/* Transparent Acrylic outer tube (Liner) */}
          <mesh userData={{ baseOpacity: 0.2 }}>
            <cylinderGeometry args={[0.075, 0.075, 1.4, 16]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.2} 
              side={THREE.DoubleSide} 
            />
          </mesh>
          
          {/* Segment 1: Loam (Brown) */}
          <mesh position={[0, 0.45, 0]} userData={{ baseOpacity: 0.9 }}>
            <cylinderGeometry args={[0.068, 0.068, 0.4, 16]} />
            <meshBasicMaterial color="#8d7a68" transparent opacity={0.9} />
          </mesh>

          {/* Segment 2: Sand (Yellowish Tan) */}
          <mesh position={[0, 0.05, 0]} userData={{ baseOpacity: 0.9 }}>
            <cylinderGeometry args={[0.068, 0.068, 0.4, 16]} />
            <meshBasicMaterial color="#d2b48c" transparent opacity={0.9} />
          </mesh>

          {/* Segment 3: Clay (Reddish Clay) */}
          <mesh position={[0, -0.35, 0]} userData={{ baseOpacity: 0.9 }}>
            <cylinderGeometry args={[0.068, 0.068, 0.4, 16]} />
            <meshBasicMaterial color="#b05a3e" transparent opacity={0.9} />
          </mesh>
          
          {/* Cybernetic holographic inspection ring */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} userData={{ baseOpacity: 0.35 }}>
            <torusGeometry args={[0.15, 0.008, 8, 24]} />
            <meshBasicMaterial color="#d31211" transparent opacity={0.35} />
          </mesh>
          <Line
            points={[[-0.18, 0.3, 0], [0.18, 0.3, 0], [-0.18, -0.3, 0], [0.18, -0.3, 0]]}
            color="#d31211"
            lineWidth={0.5}
            transparent
            opacity={0.3}
            userData={{ baseOpacity: 0.3 }}
          />

          {/* Moving Laser Scanner Ring */}
          <group ref={laserRingRef} position={[0, 0, 0]} userData={{ baseOpacity: 1.0 }}>
            <mesh>
              <torusGeometry args={[0.11, 0.008, 8, 24]} />
              <meshBasicMaterial color="#d31211" />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.11, 0.11, 0.002, 16]} />
              <meshBasicMaterial color="#d31211" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Scanning particles */}
          <points ref={particlesRef} userData={{ baseOpacity: 0.8 }}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[scanParticles, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#d31211"
              size={0.02}
              transparent
              opacity={0.8}
              sizeAttenuation={true}
            />
          </points>
        </group>
      </group>

      {/* 5. Holographic Geotechnical Soil Testing Dashboard (Overlay in 3D Space) */}
      <Html
        ref={dashboardCardRef}
        position={[1.5, 0.8, 0]}
        distanceFactor={4.5}
        center
        style={{
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div style={{
          background: 'rgba(5, 5, 5, 0.9)',
          border: '1px solid rgba(211, 18, 17, 0.6)',
          boxShadow: '0 0 20px rgba(211, 18, 17, 0.4), inset 0 0 10px rgba(211, 18, 17, 0.1)',
          borderRadius: '10px',
          padding: '16px',
          width: '260px',
          color: '#ffffff',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '11px',
          backdropFilter: 'blur(10px)',
          letterSpacing: '0.5px',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div style={{
            borderBottom: '1px solid rgba(211, 18, 17, 0.3)',
            paddingBottom: '6px',
            marginBottom: '10px',
            fontWeight: 'bold',
            color: '#d31211',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>SOIL LAB UNIT BH-04</span>
            <span style={{ 
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#d31211',
              boxShadow: '0 0 8px #d31211',
            }}></span>
          </div>
          
          {/* Phase indicator */}
          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#888888' }}>OPERATING MODE:</span>
            <span ref={phaseTextRef} style={{ color: '#ffffff', fontWeight: 'bold' }}>-</span>
          </div>

          {/* Dynamic Panel 1: Drilling */}
          <div ref={phase1PanelRef} style={{ display: 'none' }}>
            <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888888' }}>CURRENT DEPTH:</span>
              <span ref={depthTextRef} style={{ color: '#ffffff' }}>0.0 m</span>
            </div>
            <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888888' }}>ROTATION SPEED:</span>
              <span ref={rpmTextRef} style={{ color: '#ffffff' }}>0 RPM</span>
            </div>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888888' }}>TORQUE LOAD:</span>
              <span ref={torqueTextRef} style={{ color: '#ffffff' }}>0 Nm</span>
            </div>
            <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.07)', borderRadius: '3px', overflow: 'hidden' }}>
              <div ref={progressFillRef} style={{ width: '0%', height: '100%', backgroundColor: '#d31211', transition: 'width 0.1s linear' }} />
            </div>
          </div>

          {/* Dynamic Panel 2: Extracting */}
          <div ref={phase2PanelRef} style={{ display: 'none' }}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888888' }}>RETRIEVAL PROGRESS:</span>
              <span ref={retrievalTextRef} style={{ color: '#ffffff' }}>0%</span>
            </div>
            <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.07)', borderRadius: '3px', overflow: 'hidden' }}>
              <div ref={retrievalProgressFillRef} style={{ width: '0%', height: '100%', backgroundColor: '#ffffff', transition: 'width 0.1s linear' }} />
            </div>
            <div style={{ marginTop: '8px', color: '#888888', fontSize: '9px', fontStyle: 'italic' }}>
              RECOVERING UNDISTURBED SAMPLER TUBE...
            </div>
          </div>

          {/* Dynamic Panel 3: Soil testing / scan */}
          <div ref={phase3PanelRef} style={{ display: 'none' }}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 'bold' }}>
              <span>[RUNNING GEOTECH SCAN]</span>
              <span ref={scanPercentRef} style={{ color: '#d31211' }}>0%</span>
            </div>
            
            <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '6px' }}>
              <div style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888888' }}>MOISTURE CONTENT:</span>
                <span ref={moistureTextRef} style={{ color: '#ffffff' }}>-</span>
              </div>
              <div style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888888' }}>SHEAR STRENGTH (Qu):</span>
                <span ref={strengthTextRef} style={{ color: '#ffffff' }}>-</span>
              </div>
              <div style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888888' }}>BEARING CAPACITY:</span>
                <span ref={bearingTextRef} style={{ color: '#d31211', fontWeight: 'bold' }}>-</span>
              </div>
            </div>

            <div style={{ 
              marginTop: '8px', 
              padding: '4px 6px',
              backgroundColor: 'rgba(211, 18, 17, 0.15)',
              border: '1px solid rgba(211, 18, 17, 0.3)',
              borderRadius: '4px',
              color: '#d31211', 
              fontSize: '9px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              SPECTRAL SOIL CLASSIFICATION ACTIVE
            </div>
          </div>

          {/* Dynamic Panel 4: Resetting */}
          <div ref={phase4PanelRef} style={{ display: 'none' }}>
            <div style={{ color: '#888888', textAlign: 'center', padding: '6px 0' }}>
              TRANSMITTING LOG DATA...
            </div>
            <div style={{ 
              marginTop: '4px',
              color: '#28a745',
              fontSize: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              ✔ DATA TRANSFERRED SUCCESS
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// 4. Drone Mapping / Photogrammetry Scene (Re-themed to Red/Black/White)
export function DroneMapping({ active }) {
  const droneGroupRef = useRef();
  const scanConeRef = useRef();
  const rotorRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Flight movement (figure 8 orbit)
    if (droneGroupRef.current) {
      const x = Math.sin(t * 0.8) * 2;
      const z = Math.cos(t * 0.4) * 1.5;
      const y = Math.sin(t * 1.2) * 0.3 + 1.5; // hover height
      droneGroupRef.current.position.set(x, y, z);
      
      // Tilt drone slightly based on motion direction
      droneGroupRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
      droneGroupRef.current.rotation.z = Math.cos(t * 0.8) * 0.1;
      droneGroupRef.current.rotation.y = t * 0.1;
    }

    // Spin rotors super fast
    rotorRefs.current.forEach((rotor) => {
      if (rotor) rotor.rotation.y = t * 25;
    });

    // Animate mapping scan cone pulsing
    if (scanConeRef.current) {
      scanConeRef.current.scale.x = 1 + Math.sin(t * 3) * 0.05;
      scanConeRef.current.scale.z = 1 + Math.sin(t * 3) * 0.05;
      // Pulse scan cone opacity
      scanConeRef.current.material.opacity = Math.sin(t * 4) * 0.05 + 0.18;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Mapping grid base representing aerial terrain points - Crimson Red */}
      <gridHelper args={[8, 12, '#d31211', '#222222']} position={[0, -2, 0]} />

      {/* Moving Drone Group */}
      <group ref={droneGroupRef}>
        {/* Drone Main Body - Sleek Dark Grey/Black */}
        <mesh>
          <boxGeometry args={[0.6, 0.15, 0.4]} />
          <meshBasicMaterial color="#0f0f11" />
        </mesh>
        
        {/* GPS Dome - Crimson Red */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial color="#d31211" />
        </mesh>

        {/* Propeller Quadcopter Arms */}
        {/* Front Left */}
        <mesh position={[-0.4, 0, 0.3]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.04, 0.08]} />
          <meshBasicMaterial color="#888888" />
        </mesh>
        <group position={[-0.7, 0.05, 0.5]} ref={el => rotorRefs.current[0] = el}>
          <mesh><boxGeometry args={[0.6, 0.01, 0.04]} /><meshBasicMaterial color="#d31211" /></mesh>
        </group>

        {/* Front Right */}
        <mesh position={[0.4, 0, 0.3]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[0.8, 0.04, 0.08]} />
          <meshBasicMaterial color="#888888" />
        </mesh>
        <group position={[0.7, 0.05, 0.5]} ref={el => rotorRefs.current[1] = el}>
          <mesh><boxGeometry args={[0.6, 0.01, 0.04]} /><meshBasicMaterial color="#d31211" /></mesh>
        </group>

        {/* Back Left */}
        <mesh position={[-0.4, 0, -0.3]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[0.8, 0.04, 0.08]} />
          <meshBasicMaterial color="#888888" />
        </mesh>
        <group position={[-0.7, 0.05, -0.5]} ref={el => rotorRefs.current[2] = el}>
          <mesh><boxGeometry args={[0.6, 0.01, 0.04]} /><meshBasicMaterial color="#ffffff" /></mesh>
        </group>

        {/* Back Right */}
        <mesh position={[0.4, 0, -0.3]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.04, 0.08]} />
          <meshBasicMaterial color="#888888" />
        </mesh>
        <group position={[0.7, 0.05, -0.5]} ref={el => rotorRefs.current[3] = el}>
          <mesh><boxGeometry args={[0.6, 0.01, 0.04]} /><meshBasicMaterial color="#ffffff" /></mesh>
        </group>

        {/* Camera Gimbal */}
        <mesh position={[0, -0.15, 0.15]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Scanning cone - Red with low opacity */}
        <mesh ref={scanConeRef} position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.5, 4, 16, 1, true]} />
          <meshBasicMaterial 
            color="#d31211" 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </group>
    </group>
  );
}

// 5. Design & Estimation Blueprint Scene (Re-themed to Red/Black/White)
export function DesignEstimation({ active }) {
  const modelRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = t * 0.1;
      
      // Animate wireframe blending to solid if active
      if (active) {
        const wave = Math.sin(t * 1.5) * 0.2 + 0.3; // loop opacity
        modelRef.current.children[0].material.opacity = wave; // solid transparent
      }
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.5, 0]}>
      {/* 3D Blueprint House structure */}
      
      {/* Solid representation - Crimson Red translucent */}
      <mesh>
        <boxGeometry args={[2.5, 1.8, 2.5]} />
        <meshBasicMaterial color="#d31211" transparent opacity={0.25} />
      </mesh>
      
      {/* Roof Wireframe - White */}
      <mesh position={[0, 1.4, 0]} rotation={[0, Math.PI/4, 0]}>
        <coneGeometry args={[2.0, 1, 4]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>

      {/* Main walls wireframe - Crimson Red */}
      <mesh>
        <boxGeometry args={[2.5, 1.8, 2.5]} />
        <meshBasicMaterial color="#d31211" wireframe />
      </mesh>

      {/* Blueprint grid under the model - Red with grey lines */}
      <gridHelper args={[8, 8, '#d31211', '#222222']} position={[0, -1.5, 0]} />
    </group>
  );
}
