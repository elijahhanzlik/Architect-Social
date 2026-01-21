'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Html, PerspectiveCamera } from '@react-three/drei';
import { useAdminStore } from '@/lib/adminStore';
import { useAppStore } from '@/lib/store';
import * as THREE from 'three';

function EventMarker({ 
  activity, 
  location 
}: { 
  activity: any, 
  location: any 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { selectedActivity, setSelectedActivity } = useAppStore();
  const isSelected = selectedActivity?.id === activity.id;

  // Pulsing animation
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.scale.setScalar(scale);
    }
  });

  // Convert hex to THREE.Color
  const markerColor = new THREE.Color(activity.visuals.accentColor);

  return (
    <group position={[location.coordinates.x, location.coordinates.y, location.coordinates.z]}>
      {/* Glowing sphere */}
      <mesh 
        ref={meshRef}
        onClick={() => setSelectedActivity(activity)}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={isSelected ? 1.5 : 0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Larger transparent outer sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Tooltip on hover */}
      <Html
        position={[0, 2, 0]}
        center
        distanceFactor={8}
        style={{
          pointerEvents: 'none',
          opacity: isSelected ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <div className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {activity.title}
          </p>
          <p className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">
            {location.name}
          </p>
          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-500">
            {location.currentOccupancy}/{location.capacity} occupied
          </p>
        </div>
      </Html>
    </group>
  );
}

function BuildingWireframe() {
  // Create a simple building structure
  return (
    <group>
      {/* Main building block */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[40, 10, 30]} />
        <meshBasicMaterial
          color="#E2E8F0"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Upper floor */}
      <mesh position={[-10, 12, -8]}>
        <boxGeometry args={[20, 4, 15]} />
        <meshBasicMaterial
          color="#E2E8F0"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Another section */}
      <mesh position={[12, 12, 5]}>
        <boxGeometry args={[16, 4, 20]} />
        <meshBasicMaterial
          color="#E2E8F0"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export function Scene3D() {
  const { activities, locations, loadData } = useAdminStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Map activities to their locations
  const activityLocations = useMemo(() => {
    return activities.map((activity) => {
      const location = locations.find((loc) => loc.id === activity.locationId);
      return location ? { activity, location } : null;
    }).filter(Boolean) as Array<{ 
      activity: any, 
      location: any 
    }>;
  }, [activities, locations]);

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[40, 30, 40]} fov={50} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={20}
        maxDistance={100}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />

      {/* Scene elements */}
      <Grid
        args={[100, 100]}
        cellSize={2}
        cellThickness={0.5}
        cellColor="#E2E8F0"
        sectionSize={10}
        sectionThickness={1}
        sectionColor="#CBD5E1"
        fadeDistance={80}
        fadeStrength={1}
        position={[0, 0, 0]}
      />

      <BuildingWireframe />

      {/* Event markers */}
      {activityLocations.map(({ activity, location }) => (
        <EventMarker
          key={activity.id}
          activity={activity}
          location={location}
        />
      ))}

      {/* Contact shadows for depth */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.3}
        scale={80}
        blur={2}
        far={10}
      />

      {/* Background color */}
      <color attach="background" args={['#F8FAFC']} />
    </Canvas>
  );
}
