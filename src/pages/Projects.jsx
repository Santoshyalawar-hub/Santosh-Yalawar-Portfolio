import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Roadmap from '../components/Roadmap'
import { Head, Badge, Chips, Tilt, Thumb } from '../components/ui'
export default function Projects() {
  const [f, setF] = useState('all')
  const list = projects.filter((p) => f === 'all' || p.status === f)
  return (<div className="wrap page">
    <Head eyebrow="Projects" title="Selected work" text="Each project shows its real implementation status." />
    <div className="seg">{['all', 'implemented', 'in-progress'].map((s) => <button key={s} className={`btn ${f === s ? 'on' : ''}`} onClick={() => setF(s)}>{s}</button>)}</div>
    <div className="grid">{list.map((p) => (
      <Tilt as={Link} to={`/projects/${p.id}`} key={p.id}>
        <Thumb p={p} />
        <div className="row"><h3>{p.name}</h3><Badge status={p.status} /></div>
        <p className="eyebrow" style={{ margin: '6px 0' }}>{p.subtitle}{p.confidential && ' · Confidential'}</p>
        <p>{p.description}</p><div style={{ marginTop: 12 }}><Chips items={p.stack.slice(0, 6)} /></div>
      </Tilt>))}</div>
    <div className="head" style={{ marginTop: 72 }}><span className="eyebrow">Upcoming</span><h2>Roadmap</h2><p>Future projects and learning goals.</p></div>
    <Roadmap />
  </div>)
}
