import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

/** A 3D "Universidad Tagus" emblem/shield with an orbiting golden key. */
export default function TagusEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Shared gold material properties
  const goldProps = useMemo(
    () => ({
      color: new THREE.Color('#D4AF37'),
      metalness: 0.95,
      roughness: 0.15,
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Slow Y rotation
      groupRef.current.rotation.y = t * 0.15;
      // Tilt toward cursor
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.15,
        0.03,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -pointer.x * 0.1,
        0.03,
      );
    }

    // Orbiting key
    if (keyRef.current) {
      const orbitRadius = 1.8;
      keyRef.current.position.x = Math.cos(t * 0.6) * orbitRadius;
      keyRef.current.position.z = Math.sin(t * 0.6) * orbitRadius;
      keyRef.current.position.y = Math.sin(t * 0.9) * 0.3;
      keyRef.current.rotation.z = t * 0.8;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0, -3]} scale={0.7}>
        {/* Shield body — rounded box */}
        <mesh>
          <boxGeometry args={[1.6, 2, 0.15, 4, 4, 1]} />
          <meshStandardMaterial {...goldProps} />
        </mesh>

        {/* Top arch */}
        <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.8, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial {...goldProps} />
        </mesh>

        {/* Inner field — dark reflective */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.2, 1.5, 0.05]} />
          <MeshReflectorMaterial
            mirror={0.4}
            resolution={256}
            color="#0D1117"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Cross accent */}
        <mesh position={[0, 0.15, 0.12]}>
          <boxGeometry args={[0.08, 0.9, 0.04]} />
          <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0.12]}>
          <boxGeometry args={[0.6, 0.08, 0.04]} />
          <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.3} />
        </mesh>

        {/* Corner rivets */}
        {[
          [-0.65, -0.85],
          [0.65, -0.85],
          [-0.65, 0.85],
          [0.65, 0.85],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.1]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.5} />
          </mesh>
        ))}

        {/* Outer ring */}
        <mesh position={[0, 0, -0.02]}>
          <torusGeometry args={[1.3, 0.05, 12, 48]} />
          <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.2} />
        </mesh>

        {/* Orbiting golden key */}
        <group ref={keyRef}>
          <group scale={0.35}>
            {/* Key bow (ring) */}
            <mesh position={[0, 0.4, 0]}>
              <torusGeometry args={[0.25, 0.06, 12, 24]} />
              <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.6} />
            </mesh>
            {/* Key shaft */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.06, 0.9, 0.06]} />
              <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.4} />
            </mesh>
            {/* Key teeth */}
            <mesh position={[0.1, -0.55, 0]}>
              <boxGeometry args={[0.14, 0.06, 0.06]} />
              <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[0.08, -0.65, 0]}>
              <boxGeometry args={[0.1, 0.06, 0.06]} />
              <meshStandardMaterial {...goldProps} emissive="#D4AF37" emissiveIntensity={0.4} />
            </mesh>
          </group>
        </group>

        {/* Emblem glow light */}
        <pointLight position={[0, 0, 2]} color="#D4AF37" intensity={2} distance={6} />
      </group>
    </Float>
  );
}
