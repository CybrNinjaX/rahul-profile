import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, Html, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model({ layout }) {
  const { scene, animations } = useGLTF('/model.glb')
  const group = useRef()
  const { actions } = useAnimations(animations, group)
  const model = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().play())
    return () => Object.values(actions).forEach((action) => action?.stop())
  }, [actions])

  const fittedModel = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(model)
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())
    const scale = 2.65 / Math.max(size.x, size.y, size.z)
    return { scale, position: [-center.x * scale, -center.y * scale, -center.z * scale] }
  }, [model])

  useFrame((state, delta) => {
    if (!group.current) return
    const responsiveScale = Math.min(1, state.viewport.width / 5.4)
    const pose = layout.current
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pose.x, 3.2, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, pose.y, 3.2, delta)
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, pose.scale * responsiveScale, 3.2, delta))
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pose.rotation + Math.sin(state.clock.elapsedTime * 0.16) * 0.045, 2.2, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, Math.sin(state.clock.elapsedTime * 0.12) * 0.018, 2.2, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, pose.cameraZ, 2.8, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <Float speed={0.65} rotationIntensity={0.015} floatIntensity={0.035}>
        <primitive object={model} position={fittedModel.position} scale={fittedModel.scale} />
      </Float>
      <ContactShadows position={[0, -1.45, 0]} opacity={0.34} scale={4.5} blur={2.6} far={3} />
    </group>
  )
}

export default function AvatarScene({ layout }) {
  return (
    <Canvas className="avatar-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0.03, 6.6], fov: 34 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.55} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} color="#d8f7ff" />
      <spotLight position={[-3, 2.5, 3]} intensity={38} angle={0.62} penumbra={0.9} color="#00c9ef" />
      <Suspense fallback={<Html center><span className="avatar-canvas-loading">Loading model…</span></Html>}>
        <Model layout={layout} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/model.glb')
