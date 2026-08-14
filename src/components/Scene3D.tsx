import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { makeStampTexture } from './stampTextures'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

const WOOD_SIDE = '#3a2214'
const WOOD_EDGE = '#26130a'

type Kind = 'paisley' | 'floral' | 'mandala' | 'border' | 'leaf'
type Block = {
  kind: Kind
  shape: 'box' | 'hex'
  size: [number, number, number]
  pos: [number, number, number]
  tilt: [number, number, number]
  float: number
  scale: number
}

/** A carved wooden block-printing stamp: patterned face + dark rosewood body + grip. */
function Stamp({
  kind,
  shape,
  size,
  tilt = [0, 0, 0],
}: {
  kind: Kind
  shape: 'box' | 'hex'
  size: [number, number, number]
  tilt?: [number, number, number]
}) {
  const tex = useMemo(() => makeStampTexture(kind), [kind])
  const [w, h, d] = size

  if (shape === 'hex') {
    const r = w / 2
    return (
      <group rotation={tilt as unknown as THREE.Euler}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[r, r * 1.02, d, 8]} />
          <meshStandardMaterial attach="material-0" color={WOOD_SIDE} roughness={0.82} />
          <meshStandardMaterial attach="material-1" map={tex} roughness={0.6} metalness={0.04} />
          <meshStandardMaterial attach="material-2" color={WOOD_EDGE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0, -d / 2 - 0.1]} castShadow>
          <boxGeometry args={[r * 0.7, r * 0.7, 0.2]} />
          <meshStandardMaterial color={WOOD_SIDE} roughness={0.82} />
        </mesh>
      </group>
    )
  }

  return (
    <group rotation={tilt as unknown as THREE.Euler}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial attach="material-0" color={WOOD_EDGE} roughness={0.85} />
        <meshStandardMaterial attach="material-1" color={WOOD_EDGE} roughness={0.85} />
        <meshStandardMaterial attach="material-2" color={WOOD_SIDE} roughness={0.8} />
        <meshStandardMaterial attach="material-3" color={WOOD_SIDE} roughness={0.8} />
        <meshStandardMaterial attach="material-4" map={tex} roughness={0.6} metalness={0.04} />
        <meshStandardMaterial attach="material-5" color={WOOD_SIDE} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, -d / 2 - 0.11]} castShadow>
        <boxGeometry args={[w * 0.34, h * 0.5, 0.22]} />
        <meshStandardMaterial color={WOOD_SIDE} roughness={0.8} />
      </mesh>
    </group>
  )
}

// Spread wide for desktop.
const blocksDesktop: Block[] = [
  { kind: 'paisley', shape: 'box', size: [1.5, 1.5, 0.42], pos: [0.1, 2.05, 0], tilt: [-0.18, 0.32, -0.05], float: 1.2, scale: 1 },
  { kind: 'leaf', shape: 'box', size: [0.9, 1.4, 0.38], pos: [1.6, 2.95, -0.4], tilt: [0.14, 0.42, 0.1], float: 2.0, scale: 0.8 },
  { kind: 'mandala', shape: 'hex', size: [1.25, 1.25, 0.5], pos: [2.75, 2.05, -0.6], tilt: [0.16, -0.4, -0.08], float: 1.8, scale: 0.85 },
  { kind: 'floral', shape: 'hex', size: [1.15, 1.15, 0.48], pos: [2.5, 0.7, 0.2], tilt: [-0.12, -0.28, 0.06], float: 1.4, scale: 0.9 },
  { kind: 'border', shape: 'box', size: [2.1, 0.72, 0.4], pos: [-2.5, 1.2, -0.4], tilt: [0.1, -0.35, 0.12], float: 1.5, scale: 0.9 },
]

// Fewer blocks, composed for a narrow portrait frame.
// A single clean signature stamp reads best on a narrow frame.
const blocksMobile: Block[] = [
  { kind: 'paisley', shape: 'box', size: [1.5, 1.5, 0.42], pos: [0, 1.9, 0], tilt: [-0.16, 0.3, -0.04], float: 1.2, scale: 0.62 },
]

function Blocks({
  pointer,
  compact,
}: {
  pointer: React.RefObject<{ x: number; y: number }>
  compact: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const blocks = compact ? blocksMobile : blocksDesktop

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const p = pointer.current ?? { x: 0, y: 0 }
    // gentler mouse parallax + slower breathing drift
    group.current.rotation.y += (p.x * 0.14 - group.current.rotation.y) * 0.03
    group.current.rotation.x += (-p.y * 0.09 - group.current.rotation.x) * 0.03
    group.current.position.y = Math.sin(t * 0.22) * 0.08
  })

  return (
    <group ref={group}>
      {blocks.map((b, i) => (
        <Float key={i} speed={b.float * 0.6} rotationIntensity={0.3} floatIntensity={0.55}>
          <group position={b.pos} scale={b.scale}>
            <Stamp kind={b.kind} shape={b.shape} size={b.size} tilt={b.tilt} />
          </group>
        </Float>
      ))}
    </group>
  )
}

function Rig({
  pointer,
  compact,
}: {
  pointer: React.RefObject<{ x: number; y: number }>
  compact: boolean
}) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 6]} intensity={3.2} color="#fff2dc" castShadow />
      <directionalLight position={[-6, 2, 2]} intensity={1.2} color="#cf9a3c" />
      <pointLight position={[-3, 4, 4]} intensity={26} color="#cf7f52" distance={22} />
      <pointLight position={[4, -2, 3]} intensity={16} color="#9aa478" distance={20} />
      <Suspense fallback={null}>
        <Blocks pointer={pointer} compact={compact} />
      </Suspense>
    </>
  )
}

/** Reactive check for a media query. */
function useMedia(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export function Scene3D() {
  const pointer = useRef({ x: 0, y: 0 })
  const container = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const compact = useMedia('(max-width: 767px)')
  const [inView, setInView] = useState(true)

  // Pause the render loop when the hero is scrolled out of view (saves GPU).
  useEffect(() => {
    const el = container.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: '100px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onMove = (e: React.PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = (e.clientY / window.innerHeight) * 2 - 1
    pointer.current = { x, y }
  }

  return (
    <div
      ref={container}
      className="absolute inset-0"
      onPointerMove={onMove}
      style={{ cursor: 'grab' }}
      aria-hidden
    >
      <Canvas
        frameloop={reduced || !inView ? 'never' : 'always'}
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Rig pointer={pointer} compact={compact} />
      </Canvas>
    </div>
  )
}
