import { Canvas } from '@react-three/fiber'
import { Float, Icosahedron, Torus, Sparkles } from '@react-three/drei'
export default function HeroScene({ dark }) {
  const a = dark ? '#2dd4bf' : '#0d9488', b = dark ? '#818cf8' : '#6366f1'
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} /><pointLight position={[4, 4, 4]} intensity={30} color={b} />
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <Icosahedron args={[1.35, 1]}><meshStandardMaterial color={a} wireframe /></Icosahedron>
        <Icosahedron args={[0.7, 0]}><meshStandardMaterial color={b} metalness={0.6} roughness={0.25} /></Icosahedron>
      </Float>
      <Float speed={1.5}><Torus args={[2.1, 0.015, 8, 120]} rotation={[1.2, 0.3, 0]}><meshBasicMaterial color={a} /></Torus></Float>
      <Sparkles count={60} scale={7} size={2.5} speed={0.4} color={b} />
    </Canvas>
  )
}
