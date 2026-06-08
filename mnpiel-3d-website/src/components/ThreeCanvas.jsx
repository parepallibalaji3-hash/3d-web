import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { 
  SurveyTerrain, 
  ConstructionScaffold, 
  CoreDrilling, 
  DroneMapping, 
  DesignEstimation 
} from './ThreeScenes';

// Camera position controller based on page section and active service
function CameraController({ activeSection, activeService }) {
  const { camera } = useThree();
  
  // Target position and look-at vector
  const targetPos = useRef(new THREE.Vector3(0, 3, 7));
  const targetLook = useRef(new THREE.Vector3(0, -0.5, 0));
  const currentLook = useRef(new THREE.Vector3(0, -0.5, 0));

  useEffect(() => {
    // Determine camera positioning based on active section and active service
    if (activeSection === 'hero') {
      targetPos.current.set(0, 4, 8); // High wide angle
      targetLook.current.set(0, -0.5, 0);
    } else if (activeSection === 'services') {
      // Close ups depending on the selected tab
      switch (activeService) {
        case 'construction':
          targetPos.current.set(4, 3, 5); // Angle side-view
          targetLook.current.set(0, 0.5, 0);
          break;
        case 'survey':
          targetPos.current.set(-3, 3, 6); // Sweep angle
          targetLook.current.set(0, -1, 0);
          break;
        case 'drilling':
          targetPos.current.set(0, 2, 6); // Front flat view
          targetLook.current.set(0, -0.5, 0);
          break;
        case 'drone':
          targetPos.current.set(-4, 4, 5); // High scanning angle
          targetLook.current.set(0, -1, 0);
          break;
        case 'design':
          targetPos.current.set(4, 3, 5); // Blueprint iso view
          targetLook.current.set(0, 0, 0);
          break;
        default:
          targetPos.current.set(0, 3, 7);
          targetLook.current.set(0, -0.5, 0);
      }
    } else if (activeSection === 'about') {
      targetPos.current.set(5, 2, 6); // Subtle right panel view
      targetLook.current.set(-1, -0.5, 0);
    } else if (activeSection === 'projects') {
      targetPos.current.set(0, 5, 8); // Wide orbit overview
      targetLook.current.set(0, -0.5, 0);
    } else if (activeSection === 'contact') {
      targetPos.current.set(-4, 3, 6); // Left side perspective
      targetLook.current.set(1, -0.5, 0);
    }
  }, [activeSection, activeService]);

  useFrame(() => {
    // Smoothly interpolate camera position
    camera.position.lerp(targetPos.current, 0.05);
    
    // Smoothly interpolate camera look-at direction
    currentLook.current.lerp(targetLook.current, 0.05);
    camera.lookAt(currentLook.current);
  });

  return null;
}

export default function ThreeCanvas({ activeSection, activeService }) {
  // Determine which sub-scene is currently visible
  const renderScene = () => {
    if (activeSection === 'hero') {
      return <SurveyTerrain active={true} />;
    }

    if (activeSection === 'services') {
      switch (activeService) {
        case 'construction':
          return <ConstructionScaffold active={true} />;
        case 'survey':
          return <SurveyTerrain active={true} />;
        case 'drilling':
          return <CoreDrilling active={true} />;
        case 'drone':
          return <DroneMapping active={true} />;
        case 'design':
          return <DesignEstimation active={true} />;
        default:
          return <SurveyTerrain active={true} />;
      }
    }

    // Default background animations for other pages to keep the site dynamic
    if (activeSection === 'about') {
      return <ConstructionScaffold active={false} />;
    }
    if (activeSection === 'projects') {
      return <DroneMapping active={false} />;
    }
    if (activeSection === 'contact') {
      return <DesignEstimation active={false} />;
    }

    return <SurveyTerrain active={true} />;
  };

  return (
    <div id="bg-canvas-container">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, -5]} intensity={0.4} color="#d31211" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#ffffff" />
        
        {/* Render selected scene */}
        {renderScene()}

        {/* Camera controller for smooth section sweeps */}
        <CameraController 
          activeSection={activeSection} 
          activeService={activeService} 
        />

        {/* Orbit controls with zoom disabled so standard scroll is not captured */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />
      </Canvas>
    </div>
  );
}
