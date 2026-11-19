import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 800;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Gentle drift
    pos.x += sin(uTime * 0.3 + aPhase) * 0.4;
    pos.y += cos(uTime * 0.2 + aPhase * 1.3) * 0.3;
    pos.z += sin(uTime * 0.15 + aPhase * 0.7) * 0.2;

    // Mouse repulsion (subtle)
    vec2 mouseInfluence = uMouse * 2.0;
    float dist = length(pos.xy - mouseInfluence);
    float repel = smoothstep(3.0, 0.0, dist) * 0.5;
    pos.xy += normalize(pos.xy - mouseInfluence + 0.001) * repel;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    // Fade based on distance
    vAlpha = smoothstep(30.0, 5.0, -mvPos.z) * (0.4 + 0.6 * sin(uTime + aPhase));
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;

  void main() {
    // Soft circle
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    // Glow falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    glow = pow(glow, 1.5);

    // Gold color: #D4AF37
    vec3 gold = vec3(0.831, 0.686, 0.216);
    vec3 goldLight = vec3(0.941, 0.851, 0.471);
    vec3 color = mix(gold, goldLight, glow * 0.5);

    gl_FragColor = vec4(color, glow * vAlpha * 0.8);
  }
`;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();

  const { positions, sizes, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    const ph = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
      sz[i] = Math.random() * 3 + 0.5;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, sizes: sz, phases: ph };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <>
      {/* Volumetric fog / nebula layers */}
      <fog attach="fog" args={['#07070A', 8, 25]} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[phases, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Nebula glow layers */}
      <mesh position={[2, 1, -8]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.015}
        />
      </mesh>
      <mesh position={[-3, -1, -10]}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial
          color="#881337"
          transparent
          opacity={0.012}
        />
      </mesh>
      <mesh position={[0, 2, -6]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.01}
        />
      </mesh>
    </>
  );
}
