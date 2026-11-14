import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ContactShadows, Float, Html, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { siReact, siPython, siPytorch, siFlutter, siBlender, siDjango, siPostgresql, siGithub, siJavascript, siTypescript, siOpenjdk, siFastapi } from 'simple-icons'

const featuredSkills = [
  { icon: siReact, color: '#61dafb' },
  { icon: siPython, color: '#ffd43b' },
  { icon: siPytorch, color: '#ee4c2c' },
  { icon: siFlutter, color: '#54c5f8' },
  { icon: siBlender, color: '#f5792a' },
  { icon: siJavascript, color: '#f7df1e' },
  { icon: siTypescript, color: '#3178c6' },
  { icon: siOpenjdk, color: '#f89820' },
  { icon: siFastapi, color: '#009688' },
]
const skillTextures = featuredSkills.map(({ icon, color }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${color}" d="${icon.path}"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
})
const nodeData = [
  { icon: siReact, color: '#61dafb', label: 'FRONTEND', title: 'React · Next.js' },
  { icon: siPython, color: '#ffd43b', label: 'AI / ML', title: 'Python · PyTorch' },
  { icon: siDjango, color: '#75bf8a', label: 'BACKEND', title: 'Django · FastAPI' },
  { icon: siFlutter, color: '#54c5f8', label: 'MOBILE', title: 'Flutter · Dart' },
  { icon: siPostgresql, color: '#77a9d3', label: 'DATA', title: 'SQL · MongoDB' },
  { icon: siBlender, color: '#f5792a', label: '3D / CREATIVE', title: 'Blender · STL' },
  { icon: siGithub, color: '#e5f4f8', label: 'ENGINEERING', title: 'Git · Docker · AWS' },
]
const nodeTextureUrls = nodeData.map(({ icon, color, label, title }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 100"><rect x="2" y="2" width="256" height="96" rx="15" fill="#081722" fill-opacity=".97" stroke="${color}" stroke-opacity=".75" stroke-width="2"/><path transform="translate(23 24) scale(2)" fill="${color}" d="${icon.path}"/><text x="83" y="42" fill="${color}" font-family="Arial,sans-serif" font-size="13" font-weight="700" letter-spacing="1.2">${label}</text><text x="83" y="67" fill="#d8e8ed" font-family="Arial,sans-serif" font-size="15">${title}</text><circle cx="238" cy="22" r="3" fill="${color}"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
})

function Model({ progress, aboutProgress }) {
  const { scene, animations } = useGLTF('/model.glb')
  const group = useRef()
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().play())
    return () => Object.values(actions).forEach((action) => action?.stop())
  }, [actions])
  const fitted = useMemo(() => {
    const object = scene.clone(true)
    const bounds = new THREE.Box3().setFromObject(object)
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())
    const scale = 2.4 / Math.max(size.x, size.y, size.z)
    return { object, scale, position: [-center.x * scale, -center.y * scale, -center.z * scale] }
  }, [scene])

  useFrame((state, delta) => {
    const p = progress.current
    const eased = p * p * (3 - 2 * p)
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.08 + eased * 0.82, 2.4, delta)
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, eased * 0.045, 2.4, delta)
      const responsiveScale = Math.min(1, state.viewport.width / 5.1)
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, responsiveScale, 3, delta))
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, -1.35 * aboutProgress.current, 3.2, delta)
    }
    const cameraZ = p < 0.18
      ? THREE.MathUtils.lerp(4.35, 5.15, p / 0.18)
      : p < 0.42
        ? THREE.MathUtils.lerp(5.15, 7.25, (p - 0.18) / 0.24)
        : p < 0.68 ? 7.25 : THREE.MathUtils.lerp(7.25, 6.8, (p - 0.68) / 0.32)
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, 0, 2.4, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.04 + Math.sin(eased * Math.PI) * 0.07, 2.4, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, cameraZ, 2.4, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.08}>
        <primitive object={fitted.object} position={fitted.position} scale={fitted.scale} />
      </Float>
      <ContactShadows position={[0, -1.45, 0]} opacity={0.32} scale={5} blur={2.8} far={3} />
    </group>
  )
}

function Architecture({ progress }) {
  const group = useRef()
  useFrame((_, delta) => {
    const p = progress.current
    const target = THREE.MathUtils.smoothstep(p, 0.14, 0.32) * (1 - THREE.MathUtils.smoothstep(p, 0.82, 0.94))
    if (group.current) group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, target, 3, delta))
  })
  return (
    <group ref={group}>
      <mesh position={[0, 0, -1.7]}><torusGeometry args={[2.22, 0.012, 8, 120]} /><meshBasicMaterial color="#00d9ff" transparent opacity={0.65} /></mesh>
      <mesh position={[0, 0, -1.85]} scale={[1.08, 0.83, 1]}><torusGeometry args={[2.55, 0.008, 8, 120]} /><meshBasicMaterial color="#277bff" transparent opacity={0.42} /></mesh>
      <mesh position={[-1.55, 0.1, -0.8]}><boxGeometry args={[0.03, 1.8, 0.03]} /><meshStandardMaterial color="#00c8ef" emissive="#00bfea" emissiveIntensity={1.5} /></mesh>
      <mesh position={[1.6, 0.25, -0.7]}><boxGeometry args={[0.03, 2.1, 0.03]} /><meshStandardMaterial color="#00c8ef" emissive="#00bfea" emissiveIntensity={1.5} /></mesh>
      <mesh position={[0, 1.52, -1]}><boxGeometry args={[3.5, 0.018, 0.018]} /><meshBasicMaterial color="#00c8ef" transparent opacity={0.5} /></mesh>
      <mesh position={[0, -1.62, -1]}><boxGeometry args={[3.5, 0.018, 0.018]} /><meshBasicMaterial color="#00c8ef" transparent opacity={0.5} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, -0.1]}><ringGeometry args={[1.45, 1.47, 96]} /><meshBasicMaterial color="#00c8ef" transparent opacity={0.8} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, -0.1]}><ringGeometry args={[2.1, 2.115, 96]} /><meshBasicMaterial color="#197cff" transparent opacity={0.45} /></mesh>
    </group>
  )
}

function FloatingSkillIcons({ progress }) {
  const group = useRef()
  const textures = useLoader(THREE.TextureLoader, skillTextures)
  const iconRefs = useRef([])
  useEffect(() => { textures.forEach((texture) => { texture.colorSpace = THREE.SRGBColorSpace }) }, [textures])
  useFrame((state, delta) => {
    const p = progress.current
    const opacity = THREE.MathUtils.smoothstep(p, 0.13, 0.23) * (1 - THREE.MathUtils.smoothstep(p, 0.35, 0.45))
    const spread = THREE.MathUtils.smoothstep(p, 0.15, 0.34)
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.25) * 0.16, 2, delta)
    }
    iconRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      mesh.material.opacity = opacity
      mesh.position.lerpVectors(origins[index], destinations[index], spread)
      mesh.position.y += Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.07
      mesh.scale.setScalar(0.75 + spread * 0.25)
    })
  })
  const origins = useMemo(() => [[-0.12, 0.3, -1.5], [0.14, 0.24, -1.45], [-0.1, 0.05, -1.4], [0.13, -0.18, -1.5], [-0.1, -0.3, -1.45], [0.04, 0.16, -1.55], [-0.04, -0.15, -1.42], [0.08, 0.1, -1.5], [-0.1, -0.05, -1.48]].map((p) => new THREE.Vector3(...p)), [])
  const destinations = useMemo(() => [[-2.65, 1.5, -0.25], [-1.5, 1.95, -0.45], [0, 2.2, -0.3], [1.5, 1.95, -0.2], [2.65, 1.5, -0.35], [-3, 0.05, -0.2], [3, 0.05, -0.2], [-1.75, -1.75, -0.2], [1.75, -1.75, -0.2]].map((p) => new THREE.Vector3(...p)), [])
  return (
    <group ref={group}>
      {textures.map((texture, index) => <mesh key={index} ref={(node) => { iconRefs.current[index] = node }} position={origins[index]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>)}
    </group>
  )
}

const nodePositions = [[0, 2.05, -0.75], [2.68, 1.35, -0.75], [3.52, 0, -0.75], [2.68, -1.35, -0.75], [0, -2.05, -0.75], [-2.68, -1.35, -0.75], [-3.52, 0, -0.75]]

function SkillNode({ texture, index, progress, position }) {
  const ref = useRef()
  const material = useRef()
  const [selected, setSelected] = useState(false)
  useFrame((_, delta) => {
    const p = progress.current
    const reveal = THREE.MathUtils.smoothstep(p, 0.39 + index * 0.018, 0.46 + index * 0.018)
    const visible = reveal * (1 - THREE.MathUtils.smoothstep(p, 0.84, 0.96))
    if (material.current) material.current.opacity = visible
    if (ref.current) {
      const target = visible * (selected ? 1.12 : 1)
      ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, target, 5, delta))
    }
  })
  return (
    <mesh ref={ref} position={position} onPointerOver={(e) => { e.stopPropagation(); if (progress.current > 0.38) document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }} onClick={() => { if (progress.current > 0.38) setSelected((value) => !value) }}>
      <planeGeometry args={[1.3, 0.5]} />
      <meshBasicMaterial ref={material} map={texture} transparent opacity={0} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function SkillArrow({ index, progress }) {
  const lineMaterial = useRef()
  const arrowMaterial = useRef()
  const [hovered, setHovered] = useState(false)
  const start = new THREE.Vector3(...nodePositions[index])
  const end = new THREE.Vector3(...nodePositions[(index + 1) % nodePositions.length])
  const direction = end.clone().sub(start).normalize()
  const length = start.distanceTo(end)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)
  const midpoint = start.clone().add(end).multiplyScalar(0.5)
  useFrame(() => {
    const reveal = THREE.MathUtils.smoothstep(progress.current, 0.41 + index * 0.02, 0.48 + index * 0.02)
    const fade = 1 - THREE.MathUtils.smoothstep(progress.current, 0.84, 0.96)
    if (lineMaterial.current) lineMaterial.current.opacity = reveal * fade * (hovered ? 0.95 : 0.55)
    if (arrowMaterial.current) arrowMaterial.current.opacity = reveal * fade * (hovered ? 1 : 0.9)
  })
  const onPointerOver = (event) => { event.stopPropagation(); if (progress.current > 0.4) { setHovered(true); document.body.style.cursor = 'pointer' } }
  const onPointerOut = () => { setHovered(false); document.body.style.cursor = '' }
  return (
    <group>
      <mesh position={midpoint} quaternion={quaternion} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <cylinderGeometry args={[0.009, 0.009, length - 0.1, 6]} />
        <meshBasicMaterial ref={lineMaterial} color="#00d9ff" transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh position={end} quaternion={quaternion} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <coneGeometry args={[0.055, 0.14, 7]} />
        <meshBasicMaterial ref={arrowMaterial} color="#7cecff" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}

function SkillGrid({ progress }) {
  const textures = useLoader(THREE.TextureLoader, nodeTextureUrls)
  const group = useRef()
  useEffect(() => { textures.forEach((texture) => { texture.colorSpace = THREE.SRGBColorSpace }) }, [textures])
  useFrame((state, delta) => {
    const responsiveScale = Math.min(1, Math.max(0.3, state.viewport.width / 8.8))
    if (group.current) {
      group.current.scale.x = THREE.MathUtils.damp(group.current.scale.x, responsiveScale, 4, delta)
      group.current.scale.y = THREE.MathUtils.damp(group.current.scale.y, responsiveScale, 4, delta)
    }
  })
  return (
    <group ref={group}>
      {nodePositions.map((position, index) => <SkillArrow key={`arrow-${index}`} index={index} progress={progress} />)}
      {textures.map((texture, index) => <SkillNode key={`node-${index}`} texture={texture} index={index} position={nodePositions[index]} progress={progress} />)}
    </group>
  )
}

export default function AvatarScene({ progress, aboutProgress }) {
  return (
    <Canvas className="avatar-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0.03, 4.35], fov: 34 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} color="#d8f7ff" />
      <spotLight position={[-3, 1.5, 2]} intensity={65} angle={0.55} penumbra={0.8} color="#00cfff" />
      <spotLight position={[3, 1, -1]} intensity={45} angle={0.5} penumbra={0.9} color="#316fff" />
      <Suspense fallback={<Html center><span className="avatar-canvas-loading">Loading avatar…</span></Html>}>
        <Architecture progress={aboutProgress} />
        <FloatingSkillIcons progress={aboutProgress} />
        <SkillGrid progress={progress} />
        <Model progress={progress} aboutProgress={aboutProgress} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/model.glb')
