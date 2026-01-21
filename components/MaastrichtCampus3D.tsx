'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Html, PerspectiveCamera } from '@react-three/drei';
import { useAdminStore } from '@/lib/adminStore';
import { useAppStore } from '@/lib/store';
import * as THREE from 'three';

// Event Marker Component
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

  const markerColor = new THREE.Color(activity.visuals.accentColor);

  return (
    <group position={[location.coordinates.x, location.coordinates.y + 1.5, location.coordinates.z]}>
      {/* Glowing sphere */}
      <mesh 
        ref={meshRef}
        onClick={() => setSelectedActivity(activity)}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={isSelected ? 2 : 1}
          toneMapped={false}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Tooltip */}
      <Html
        position={[0, 2.5, 0]}
        center
        distanceFactor={10}
        style={{
          pointerEvents: 'none',
          opacity: isSelected ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <div className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {activity.title}
          </p>
          <p className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">
            {location.name}
          </p>
        </div>
      </Html>
    </group>
  );
}

// Main University Building - Courtyard Style
function CourtyardBuilding() {
  return (
    <group>
      {/* WEST WING */}
      <mesh position={[-22, 2.5, 0]} castShadow>
        <boxGeometry args={[4, 5, 40]} />
        <meshStandardMaterial
          color="#E2E8F0"
          wireframe={false}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* EAST WING */}
      <mesh position={[24, 2.5, 0]} castShadow>
        <boxGeometry args={[4, 5, 36]} />
        <meshStandardMaterial
          color="#E2E8F0"
          wireframe={false}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* NORTH WING */}
      <mesh position={[0, 2.5, -18]} castShadow>
        <boxGeometry args={[44, 5, 4]} />
        <meshStandardMaterial
          color="#E2E8F0"
          wireframe={false}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* SOUTH WING */}
      <mesh position={[0, 2.5, 18]} castShadow>
        <boxGeometry args={[44, 5, 4]} />
        <meshStandardMaterial
          color="#E2E8F0"
          wireframe={false}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* FIRST FLOOR - West Wing */}
      <mesh position={[-22, 6.5, 0]} castShadow>
        <boxGeometry args={[4, 4, 35]} />
        <meshStandardMaterial
          color="#CBD5E1"
          wireframe={false}
          transparent
          opacity={0.35}
        />
      </mesh>
      
      {/* FIRST FLOOR - East Wing */}
      <mesh position={[24, 6.5, 3]} castShadow>
        <boxGeometry args={[4, 4, 30]} />
        <meshStandardMaterial
          color="#CBD5E1"
          wireframe={false}
          transparent
          opacity={0.35}
        />
      </mesh>
      
      {/* FIRST FLOOR - North Wing */}
      <mesh position={[2, 6.5, -18]} castShadow>
        <boxGeometry args={[36, 4, 4]} />
        <meshStandardMaterial
          color="#CBD5E1"
          wireframe={false}
          transparent
          opacity={0.35}
        />
      </mesh>
      
      {/* FIRST FLOOR - South Wing */}
      <mesh position={[-2, 6.5, 18]} castShadow>
        <boxGeometry args={[32, 4, 4]} />
        <meshStandardMaterial
          color="#CBD5E1"
          wireframe={false}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* ROOF SECTIONS - Sloped roofs */}
      <mesh position={[-22, 9, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[4, 0.3, 35]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      
      <mesh position={[0, 9, -18]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[44, 0.3, 4]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>

      {/* Wireframe overlay for architectural feel */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(4, 5, 40)]} />
        <lineBasicMaterial attach="material" color="#64748B" linewidth={1} />
      </lineSegments>
    </group>
  );
}

// Courtyard Floor
function Courtyard() {
  return (
    <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[36, 28]} />
      <meshStandardMaterial 
        color="#F1F5F9" 
        roughness={0.8}
      />
    </mesh>
  );
}

// Back Garden
function BackGarden() {
  return (
    <group position={[0, 0, 30]}>
      {/* Garden area */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.9} />
      </mesh>
      
      {/* Trees (simplified) */}
      {[-15, -8, 0, 8, 15].map((x, i) => (
        <group key={i} position={[x, 0, Math.sin(i) * 5]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 3]} />
            <meshStandardMaterial color="#78350F" />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[2, 8, 8]} />
            <meshStandardMaterial color="#22C55E" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Driveway / Entrance Area
function Driveway() {
  return (
    <mesh position={[0, 0.01, -28]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 12]} />
      <meshStandardMaterial color="#94A3B8" roughness={0.7} />
    </mesh>
  );
}

// Neighboring Buildings (Heksenstraat)
function NeighboringBuildings() {
  return (
    <group>
      {/* Building 1 - East side */}
      <mesh position={[45, 4, 5]} castShadow>
        <boxGeometry args={[12, 8, 20]} />
        <meshStandardMaterial
          color="#D1D5DB"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Building 2 - East side */}
      <mesh position={[45, 4, -15]} castShadow>
        <boxGeometry args={[12, 8, 18]} />
        <meshStandardMaterial
          color="#D1D5DB"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Street (Heksenstraat) */}
      <mesh position={[34, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 60]} />
        <meshStandardMaterial color="#71717A" />
      </mesh>
    </group>
  );
}

// Ground Plane
function GroundPlane() {
  return (
    <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[150, 150]} />
      <meshStandardMaterial color="#E5E7EB" roughness={1} />
    </mesh>
  );
}

// Main Scene
export function MaastrichtCampus3D() {
  const { activities, locations, loadData } = useAdminStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      <PerspectiveCamera makeDefault position={[60, 40, 60]} fov={50} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={20}
        maxDistance={120}
        maxPolarAngle={Math.PI / 2.2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[30, 40, 30]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={150}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
      />
      <hemisphereLight
        args={['#87CEEB', '#E5E7EB', 0.6]}
      />

      {/* Scene Elements */}
      <GroundPlane />
      <CourtyardBuilding />
      <Courtyard />
      <BackGarden />
      <Driveway />
      <NeighboringBuildings />

      {/* Grid */}
      <Grid
        args={[140, 140]}
        cellSize={2}
        cellThickness={0.5}
        cellColor="#CBD5E1"
        sectionSize={10}
        sectionThickness={1}
        sectionColor="#94A3B8"
        fadeDistance={100}
        fadeStrength={1}
        position={[0, 0.05, 0]}
      />

      {/* Event Markers */}
      {activityLocations.map(({ activity, location }) => (
        <EventMarker
          key={activity.id}
          activity={activity}
          location={location}
        />
      ))}

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.25}
        scale={100}
        blur={2}
        far={20}
      />

      {/* Sky-like background */}
      <color attach="background" args={['#F0F9FF']} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#F0F9FF', 80, 140]} />
    </Canvas>
  );
}
