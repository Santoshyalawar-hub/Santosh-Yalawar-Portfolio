import { lazy, Suspense } from 'react'
const HeroScene = lazy(() => import('./three/HeroScene'))
// 3D loads only on larger screens and when motion is allowed; otherwise a CSS fallback shows.
export default function Scene({ dark }) {
  const on = typeof matchMedia === 'function' && matchMedia('(min-width:700px)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
  return <div className="scene" aria-hidden="true"><div className="fb" />{on && <Suspense fallback={null}><HeroScene dark={dark} /></Suspense>}</div>
}
