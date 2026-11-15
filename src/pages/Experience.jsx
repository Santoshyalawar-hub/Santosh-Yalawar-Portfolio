import { Link } from 'react-router-dom'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { Head, Chips, Tilt } from '../components/ui'
export default function Experience() {
  return (<div className="wrap page">
    <Head eyebrow="Experience" title="Professional timeline" text="Verified responsibilities only." />
    <div className="stack">{experience.map((x) => (
      <div className="tl" key={x.title}><Tilt>
        <div className="row"><h3>{x.title}{x.company && ` · ${x.company}`}</h3><span className="pill">{x.type} · {x.duration}</span></div>
        <ul className="ck">{x.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
        <Chips items={x.tech} />
        <p style={{ marginTop: 14 }}>Projects: {x.projects.map((id, i) => { const p = projects.find((q) => q.id === id); return p && <span key={id}>{i > 0 && ', '}<Link style={{ color: 'var(--ac)', fontWeight: 700 }} to={`/projects/${id}`}>{p.name}</Link></span> })}</p>
      </Tilt></div>))}
    </div>
  </div>)
}
