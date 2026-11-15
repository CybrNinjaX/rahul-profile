import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uCrackle;
  uniform float uFill;
  uniform float uHover;
  uniform vec2 uPointer;
  uniform vec3 uColor;
  varying vec3 vPosition;
  varying vec3 vNormal;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z
    );
  }

  void main() {
    vec3 p = normalize(vPosition);
    vec3 normal = normalize(vNormal);
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float pointerWarp = uHover * 0.22 * length(uPointer);
    float flow = noise(p * 4.0 + vec3(uTime * 0.12, -uTime * 0.08, pointerWarp));
    float plasma = sin(p.x * 8.0 + p.y * 5.0 + p.z * 4.0 + flow * 8.0 + uTime * 0.45 + pointerWarp * 3.0);
    float veins = pow(1.0 - abs(sin((p.x * 11.0 + p.y * 9.0 - p.z * 7.0 + flow * 9.0) * 2.2)), 20.0);
    float crack = smoothstep(0.35, 0.92, veins * uCrackle);
    float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.1);
    float inside = smoothstep(0.02, 0.98, flow + plasma * 0.12);
    vec3 deep = uColor * 0.12;
    vec3 body = mix(deep, uColor, inside * uFill + 0.12);
    vec3 glow = uColor * (0.35 + inside * 0.45 + crack * 2.4 + rim * 1.15);
    gl_FragColor = vec4(body + glow, clamp(0.24 + uFill * 0.36 + rim * 0.34 + crack * 0.68, 0.0, 0.92));
  }
`

export default function CrystalizedBall({
  preset = 'plasma',
  color = '#35DFFF',
  size = 0.7,
  crackle = 0.85,
  fill = 0.5,
  interactive = true,
  hoverStrength = 0.7,
}) {
  const mesh = useRef(null)
  const material = useRef(null)
  const pointerTarget = useRef(new THREE.Vector2())
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCrackle: { value: crackle },
    uFill: { value: fill },
    uHover: { value: interactive ? hoverStrength : 0 },
    uPointer: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color(color) },
  }), [color, crackle, fill, hoverStrength, interactive])

  useEffect(() => {
    if (!interactive) return undefined
    const trackPointer = (event) => {
      pointerTarget.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      )
    }
    window.addEventListener('pointermove', trackPointer, { passive: true })
    return () => window.removeEventListener('pointermove', trackPointer)
  }, [interactive])

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime
      if (interactive) {
        material.current.uniforms.uPointer.value.lerp(pointerTarget.current, Math.min(1, delta * 2.4))
      }
    }
    if (mesh.current) {
      mesh.current.rotation.y += delta * (preset === 'plasma' ? 0.12 : 0.08)
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0.05, -1.9]}>
      <sphereGeometry args={[size * 1.7, 72, 56]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  )
}
