import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, Html, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import {
  siReact, siPython, siPytorch, siFlutter, siBlender, siDjango, siPostgresql,
  siOpenjdk, siFastapi, siHuggingface, siNvidia, siDocker, siN8n, siGithub,
  siGooglecolab,
} from 'simple-icons'

const featuredSkills = [
  { icon: siReact, color: '#61dafb' },
  { icon: siPython, color: '#3776ab' },
  { icon: siOpenjdk, color: '#f89820' },
  { icon: siFlutter, color: '#54c5f8' },
  { icon: siPytorch, color: '#ee4c2c' },
  { icon: siHuggingface, color: '#ffd21e' },
  { icon: siNvidia, color: '#76b900' },
  { icon: siBlender, color: '#f5792a' },
  { icon: siFastapi, color: '#00bfa5' },
  { path: 'M1 21 6 3h4l-3 10 5-8 4 8 2-10h4l-4 18h-4l-4-8-5 8zm2 2q9 3 18-2v-2q-8 4-17 1z', color: '#ff9900' },
]

function extrudeLogo(path) {
  const loader = new SVGLoader()
  const parsed = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="${path}"/></svg>`)
  const shapes = parsed.paths.flatMap((shapePath) => shapePath.toShapes())
  const geometry = new THREE.ExtrudeGeometry(shapes, { depth: 1.3, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.22, bevelThickness: 0.18, curveSegments: 8 })
  geometry.computeBoundingBox()
  const center = geometry.boundingBox.getCenter(new THREE.Vector3())
  geometry.translate(-center.x, -center.y, -center.z)
  geometry.scale(0.035, 0.035, 0.035)
  return geometry
}
const nodeData = [
  { icon: siPython, color: '#ffd43b', label: 'PROGRAMMING LANGUAGES', title: ['Java · Python · C · C++', 'TypeScript · JavaScript', 'Dart · HTML5'] },
  { icon: siReact, color: '#61dafb', label: 'FRONTEND & MOBILE', title: ['Next.js · Tailwind CSS', 'Flutter · React Native'] },
  { icon: siDjango, color: '#75bf8a', label: 'BACKEND FRAMEWORKS', title: ['Spring Boot · Django', 'Flask · FastAPI'] },
  { icon: siHuggingface, color: '#ffd21e', label: 'AI & MACHINE LEARNING', title: ['Hugging Face · Scikit-learn', 'TorchAudio'] },
  { icon: siGooglecolab, color: '#f9ab00', label: 'AI / DATA SCIENCE TOOLS', title: ['Google Colab · Kaggle'] },
  { icon: siPostgresql, color: '#77a9d3', label: 'DATABASES', title: ['MongoDB · MySQL', 'PostgreSQL'] },
  { icon: siDocker, color: '#54c5f8', label: 'CLOUD & BACKEND SERVICES', title: ['AWS · Firebase · Supabase', 'Docker'] },
  { icon: siN8n, color: '#ea4b71', label: 'AUTOMATION & TESTING', title: ['n8n · Selenium · Jira'] },
  { icon: siBlender, color: '#f5792a', label: '3D MODELING & PRINTING', title: ['Blender · Bambu Lab A1'] },
]
function createSkillTexture({ icon, color, label, title }) {
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 336
  const context = canvas.getContext('2d')
  context.scale(3, 3)
  context.beginPath()
  context.roundRect(2, 2, 296, 108, 16)
  context.fillStyle = 'rgba(8, 23, 34, .98)'
  context.fill()
  context.strokeStyle = 'rgba(255, 155, 67, .88)'
  context.lineWidth = 2.4
  context.stroke()
  context.save()
  context.translate(24, 31)
  context.scale(2, 2)
  context.fillStyle = color
  context.fill(new Path2D(icon.path))
  context.restore()
  context.fillStyle = '#ffb66b'
  context.font = '700 13px Arial, sans-serif'
  context.letterSpacing = '1.3px'
  context.fillText(label, 83, 43, 205)
  context.fillStyle = '#e3f0f4'
  context.font = '13px Arial, sans-serif'
  context.letterSpacing = '0'
  title.forEach((line, index) => context.fillText(line, 83, 64 + index * 16, 205))
  context.beginPath()
  context.arc(278, 23, 3, 0, Math.PI * 2)
  context.fillStyle = '#ff9b43'
  context.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function Model({ progress, aboutProgress, skillsProgress, cursor }) {
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
      const skillCentering = THREE.MathUtils.smoothstep(skillsProgress.current, 0, 0.08)
      const aboutScale = 1 + aboutProgress.current * (1 - skillCentering) * 0.26
      const skillsScale = 1 + skillCentering * 0.12
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, responsiveScale * aboutScale * skillsScale, 3, delta))
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, -1.7 * responsiveScale * aboutProgress.current * (1 - skillCentering), 3.2, delta)
    }
    const cameraZBase = p < 0.18
      ? THREE.MathUtils.lerp(4.35, 5.15, p / 0.18)
      : p < 0.42
        ? THREE.MathUtils.lerp(5.15, 7.25, (p - 0.18) / 0.24)
        : p < 0.68 ? 7.25 : THREE.MathUtils.lerp(7.25, 6.8, (p - 0.68) / 0.32)
    const skillCameraBlend = THREE.MathUtils.smoothstep(skillsProgress.current, 0, 0.08) * (1 - THREE.MathUtils.smoothstep(skillsProgress.current, 0.94, 1))
    const cameraZ = THREE.MathUtils.lerp(cameraZBase, 8.4, skillCameraBlend)
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, 0, 2.4, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.04 + Math.sin(eased * Math.PI) * 0.07, 2.4, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, cameraZ, 2.4, delta)
    state.camera.lookAt(cursor.current.x * 0.12, -cursor.current.y * 0.08, 0)
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

function CursorLight({ cursor }) {
  const light = useRef()
  useFrame((_, delta) => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.damp(light.current.position.x, -3 + cursor.current.x * 2.6, 3, delta)
    light.current.position.y = THREE.MathUtils.damp(light.current.position.y, 1.5 - cursor.current.y * 1.6, 3, delta)
  })
  return <spotLight ref={light} position={[-3, 1.5, 2]} intensity={72} angle={0.58} penumbra={0.9} color="#00d9ff" />
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

function FloatingSkillIcons({ progress, presence }) {
  const group = useRef()
  const logos = useMemo(() => featuredSkills.map(({ icon, path, color }) => ({ geometry: extrudeLogo(icon?.path ?? path), color })), [])
  const iconRefs = useRef([])
  useEffect(() => () => logos.forEach(({ geometry }) => geometry.dispose()), [logos])
  useFrame((state, delta) => {
    const opacity = THREE.MathUtils.clamp(presence.current, 0, 1)
    const spread = THREE.MathUtils.smoothstep(progress.current, 0.02, 0.5)
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.25) * 0.16, 2, delta)
      const responsiveScale = Math.min(1, state.viewport.width / 5.1)
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, responsiveScale, 3, delta))
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, -1.7 * responsiveScale * progress.current, 3.2, delta)
    }
    iconRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      mesh.material.opacity = opacity
      mesh.position.lerpVectors(origins[index], destinations[index], spread)
      const phase = state.clock.elapsedTime * 0.72 + index * 1.7
      mesh.position.x += Math.sin(phase) * 0.075
      mesh.position.y += Math.cos(phase * 0.83) * 0.065
      mesh.position.z += Math.sin(phase * 0.66) * 0.045
      mesh.rotation.z = Math.sin(phase) * 0.12
      mesh.rotation.y = Math.cos(phase * 0.7) * 0.08
      mesh.scale.setScalar((0.34 + (index % 3) * 0.04) * (0.8 + spread * 0.2))
    })
  })
  const origins = useMemo(() => [[-0.12, 0.3, -1.5], [0.14, 0.24, -1.45], [-0.1, 0.05, -1.4], [0.13, -0.18, -1.5], [-0.1, -0.3, -1.45], [0.04, 0.16, -1.55], [-0.04, -0.15, -1.42], [0.08, 0.1, -1.5], [-0.1, -0.05, -1.48], [0.06, -0.11, -1.52]].map((p) => new THREE.Vector3(...p)), [])
  const destinations = useMemo(() => [[-0.72, 0.9, -1.35], [-0.18, 1.15, -1.55], [0.42, 1.03, -1.3], [0.92, 0.68, -1.45], [1.02, 0.05, -1.55], [0.82, -0.65, -1.35], [0.2, -1.12, -1.5], [-0.52, -0.95, -1.35], [-1.02, -0.38, -1.5], [-0.96, 0.35, -1.4]].map((p) => new THREE.Vector3(...p)), [])
  return (
    <group ref={group}>
      {logos.map((logo, index) => <mesh key={index} ref={(node) => { iconRefs.current[index] = node }} geometry={logo.geometry} position={origins[index]}>
        <meshStandardMaterial color={logo.color} emissive={logo.color} emissiveIntensity={0.25} metalness={0.4} roughness={0.25} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>)}
    </group>
  )
}

const skillRadius = 2.35
// Nine 40-degree positions keep the cards evenly spaced around the model.
const skillNodePositions = Array.from({ length: 9 }, (_, index) => {
  const angle = (Math.PI / 2) - index * (Math.PI * 2 / 9)
  return [Math.cos(angle) * skillRadius, Math.sin(angle) * skillRadius, -1.08]
})
const skillNodeOrigin = [0, 0, -1.18]
const skillNodeOriginVector = new THREE.Vector3(...skillNodeOrigin)

function skillReveal(progress, index) {
  const start = 0.1 + index * 0.08
  const expanded = THREE.MathUtils.smoothstep(progress, start, start + 0.06)
  const activeUntil = start + 0.08
  const active = progress >= start && (index === 8 || progress < activeUntil)
  const fade = 1 - THREE.MathUtils.smoothstep(progress, 0.94, 1)
  return { expanded, visible: expanded * fade, active }
}

function SkillNode({ texture, index, progress, destination }) {
  const ref = useRef()
  const material = useRef()
  const destinationVector = useMemo(() => new THREE.Vector3(...destination), [destination])
  const [selected, setSelected] = useState(false)
  useFrame((_, delta) => {
    const { expanded, visible, active } = skillReveal(progress.current, index)
    if (material.current) {
      material.current.opacity = visible * (active ? 1 : 0.38)
      material.current.color.set(active ? '#ffffff' : '#8296a2')
    }
    if (ref.current) {
      ref.current.position.lerpVectors(skillNodeOriginVector, destinationVector, expanded)
      ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, visible * (selected || active ? 1.08 : 0.96), 5, delta))
    }
  })
  return (
    <mesh ref={ref} position={skillNodeOrigin} onPointerOver={(e) => { e.stopPropagation(); if (progress.current > 0.15) document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }} onClick={() => { if (progress.current > 0.15) setSelected((value) => !value) }}>
      <planeGeometry args={[1.4, 0.52]} />
      <meshBasicMaterial ref={material} map={texture} transparent opacity={0} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function SkillConnector({ index, progress, destination }) {
  const line = useRef()
  const material = useRef()
  const [hovered, setHovered] = useState(false)
  const destinationVector = useMemo(() => new THREE.Vector3(...destination), [destination])
  const end = useMemo(() => new THREE.Vector3(), [])
  const direction = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const { expanded, visible, active } = skillReveal(progress.current, index)
    end.copy(destinationVector).lerp(skillNodeOriginVector, 1 - expanded)
    direction.subVectors(end, skillNodeOriginVector)
    if (line.current && direction.lengthSq() > 0.0001) {
      line.current.position.copy(skillNodeOriginVector).add(end).multiplyScalar(0.5)
      line.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
      line.current.scale.y = direction.length()
    }
    if (material.current) material.current.opacity = visible * (hovered ? 0.95 : active ? 0.72 : 0.22)
  })
  const onPointerOver = (event) => { event.stopPropagation(); if (progress.current > 0.15) { setHovered(true); document.body.style.cursor = 'pointer' } }
  const onPointerOut = () => { setHovered(false); document.body.style.cursor = '' }
  return (
    <mesh ref={line} position={skillNodeOrigin} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <cylinderGeometry args={[0.012, 0.012, 1, 8]} />
      <meshBasicMaterial ref={material} color="#ff9b43" transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

function SkillRing({ progress }) {
  const ring = useRef()
  const material = useRef()
  useFrame((state, delta) => {
    const p = progress.current
    const appear = THREE.MathUtils.smoothstep(p, 0.03, 0.2)
    const fade = 1 - THREE.MathUtils.smoothstep(p, 0.94, 1)
    if (material.current) material.current.opacity = appear * fade * 0.72
    if (ring.current) {
      ring.current.scale.setScalar(THREE.MathUtils.damp(ring.current.scale.x, 0.82 + appear * 0.18, 4, delta))
      ring.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.16) * 0.025
    }
  })
  return (
    <mesh ref={ring} position={[0, 0, -1.48]}>
      <torusGeometry args={[skillRadius, 0.012, 8, 128]} />
      <meshBasicMaterial ref={material} color="#ff9b43" transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

function SkillGrid({ progress }) {
  const textures = useMemo(() => nodeData.map(createSkillTexture), [])
  const group = useRef()
  useFrame((state, delta) => {
    const responsiveScale = Math.min(1, Math.max(0.3, state.viewport.width / 5.1))
    if (group.current) {
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, responsiveScale, 4, delta))
    }
  })
  return (
    <group ref={group}>
      <SkillRing progress={progress} />
      {skillNodePositions.map((destination, index) => <SkillConnector key={`line-${index}`} index={index} progress={progress} destination={destination} />)}
      {textures.map((texture, index) => <SkillNode key={`node-${index}`} texture={texture} index={index} destination={skillNodePositions[index]} progress={progress} />)}
    </group>
  )
}

export default function AvatarScene({ progress, aboutProgress, iconsProgress, skillsProgress, cursor }) {
  return (
    <Canvas className="avatar-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0.03, 4.35], fov: 36 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} color="#d8f7ff" />
      <CursorLight cursor={cursor} />
      <spotLight position={[3, 1, -1]} intensity={45} angle={0.5} penumbra={0.9} color="#316fff" />
      <Suspense fallback={<Html center><span className="avatar-canvas-loading">Loading avatar…</span></Html>}>
        <Architecture progress={aboutProgress} />
        <FloatingSkillIcons progress={aboutProgress} presence={iconsProgress} />
        <SkillGrid progress={skillsProgress} />
        <Model progress={progress} aboutProgress={aboutProgress} skillsProgress={skillsProgress} cursor={cursor} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/model.glb')
