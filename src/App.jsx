import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { Skeleton } from './components/ui'
const pg = { About: lazy(() => import('./pages/About')), Experience: lazy(() => import('./pages/Experience')), Skills: lazy(() => import('./pages/Skills')), Projects: lazy(() => import('./pages/Projects')), ProjectDetail: lazy(() => import('./pages/ProjectDetail')), Architecture: lazy(() => import('./pages/Architecture')), Contact: lazy(() => import('./pages/Contact')) }
export default function App() {
  return (<ErrorBoundary><BrowserRouter><Suspense fallback={<Skeleton />}><Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<pg.About />} /><Route path="experience" element={<pg.Experience />} /><Route path="skills" element={<pg.Skills />} />
      <Route path="projects" element={<pg.Projects />} /><Route path="projects/:id" element={<pg.ProjectDetail />} />
      <Route path="architecture" element={<pg.Architecture />} /><Route path="contact" element={<pg.Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route></Routes></Suspense></BrowserRouter></ErrorBoundary>)
}
