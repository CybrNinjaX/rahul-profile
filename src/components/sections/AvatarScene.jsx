import { Component, Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, Html, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import CrystalizedBall from '../animations/CrystalizedBall.jsx'

function Model({ layout, activeSection }) {
  const { scene, animations } = useGLTF('/model.glb')
  const group = useRef()
  const { actions } = useAnimations(animations, group)

  // Clone once
  const model = useMemo(() => scene.clone(true), [scene])

  // Play animations
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().fadeIn(0.4).play()
        action.setLoop(THREE.LoopRepeat, Infinity)
      }
    })
    return () => {
      Object.values(actions).forEach((action) => action?.fadeOut(0.3).stop())
    }
  }, [actions])

  // Auto-fit the model so it has consistent size
  const fitted = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(model)
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())

    // Slightly larger base scale so the model feels present
    const scale = 2.85 / Math.max(size.x, size.y, size.z)

    return {
      scale,
      position: [
        -center.x * scale,
        -center.y * scale - 0.15, // slight downward bias looks better with text
        -center.z * scale,
      ],
    }
  }, [model])

  useFrame((state, delta) => {
    if (!group.current || !layout?.current) return

    const pose = layout.current
    const responsiveScale = Math.min(1.05, state.viewport.width / 5.2)

    // Smooth position
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      pose.x,
      2.8,
      delta
    )
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      pose.y,
      2.8,
      delta
    )

    // Smooth scale
    const targetScale = pose.scale * responsiveScale
    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, targetScale, 2.8, delta)
    )

    // Gentle idle rotation + pose rotation
    const idleY = Math.sin(state.clock.elapsedTime * 0.18) * 0.04
    const idleX = Math.sin(state.clock.elapsedTime * 0.13) * 0.016

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pose.rotation + idleY,
      2.0,
      delta
    )
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      idleX,
      2.0,
      delta
    )

    // Camera
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      pose.cameraZ,
      2.4,
      delta
    )
    state.camera.lookAt(0, 0.1, 0)
  })

  return (
    <>
      {activeSection === 'skills' && (
        <CrystalizedBall
          preset="plasma"
          color="#35DFFF"
          size={0.7}
          crackle={0.85}
          fill={0.5}
          interactive
          hoverStrength={0.7}
        />
      )}

      <group ref={group}>
        <Float
          speed={0.55}
          rotationIntensity={0.012}
          floatIntensity={0.028}
        >
          <primitive
            object={model}
            position={fitted.position}
            scale={fitted.scale}
          />
        </Float>

        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.38}
          scale={5.2}
          blur={2.8}
          far={3.5}
          color="#001820"
        />
      </group>
    </>
  )
}

class AvatarErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('The 3D avatar could not be rendered.', error)
  }

  render() {
    if (this.state.hasError) {
      return <div className="avatar-canvas-fallback" aria-hidden="true" />
    }

    return this.props.children
  }
}

export default function AvatarScene({ layout, activeSection }) {
  return (
    <AvatarErrorBoundary>
      <Canvas
        className="avatar-canvas"
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.05, 6.6], fov: 32 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1.35} />
        <directionalLight
          position={[2.2, 3.4, 4.2]}
          intensity={2.4}
          color="#d8f7ff"
        />
        <spotLight
          position={[-3.2, 2.8, 3.2]}
          intensity={42}
          angle={0.58}
          penumbra={0.85}
          color="#00c9ef"
          castShadow={false}
        />
        <pointLight
          position={[0, -1.8, 2]}
          intensity={12}
          color="#0a6a8a"
          distance={8}
        />

        <Suspense
          fallback={
            <Html center>
              <span className="avatar-loading">Loading 3D Model...</span>
            </Html>
          }
        >
          <Model layout={layout} activeSection={activeSection} />
        </Suspense>
      </Canvas>
    </AvatarErrorBoundary>
  )
}

useGLTF.preload('/model.glb')
