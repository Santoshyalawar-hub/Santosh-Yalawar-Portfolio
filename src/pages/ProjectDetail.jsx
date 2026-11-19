import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { diagrams } from '../data/architecture'
import Diagram from '../components/Diagram'
import { Badge, Chips, Tilt, Thumb, Ring } from '../components/ui'
function useSpy(ids) {
  const [a, setA] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setA(e.target.id)), { rootMargin: '-30% 0px -60% 0px' })
    ids.forEach((i) => { const el = document.getElementById(i); el && io.observe(el) }); return () => io.disconnect()
  }, [ids])
  return a
}
const Sec = ({ id, title, children }) => <section id={id} className="case"><h3 className="sec">{title}</h3>{children}</section>
export default function ProjectDetail() {
  const { id } = useParams()
  const p = projects.find((x) => x.id === id)
  const d = diagrams.find((x) => x.id === id)
  const [sel, setSel] = useState(null)
  const secs = p ? [['overview', 'Overview'], p.problem && ['problem', 'Problem & solution'], ['features', 'Features'], p.decisions && ['decisions', 'Decisions'], p.challenge && ['challenge', 'Challenge'], d && ['architecture', 'Architecture'], p.screenshots?.length && ['gallery', 'Screenshots'], ['stack', 'Stack']].filter(Boolean) : []
  const active = useSpy(secs.map((s) => s[0]))
  if (!p) return <Navigate to="/projects" replace />
  const done = p.features.filter((f) => f.status === 'implemented').length
  const node = d?.nodes.find((n) => n.id === sel)
  return (<div className="wrap page">
    <Link to="/projects" className="eyebrow">← All projects</Link>
    <div className="case-layout">
      <aside className="side" aria-label="On this page">{secs.map(([i, l]) => <a key={i} href={`#${i}`} className={active === i ? 'on' : ''}>{l}</a>)}</aside>
      <div className="stack-lg">
        <section id="overview" className="case">
          <Thumb p={p} />
          <div className="row" style={{ marginTop: 18 }}><div><span className="eyebrow">{p.subtitle}</span><h1 style={{ fontSize: 'clamp(34px,5vw,56px)' }}>{p.name}</h1></div><Ring done={done} total={p.features.length} /></div>
          <p className="lead" style={{ marginTop: 12 }}>{p.description}</p>
          <div className="row" style={{ justifyContent: 'flex-start', margin: '14px 0' }}><Badge status={p.status} />{p.confidential && <span className="pill">Company project · Confidential</span>}</div>
          {p.note && <p className="note">{p.note}</p>}
          <div className="acts" style={{ marginTop: 16 }}>{p.github && <a className="btn" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{p.demo && <a className="btn p" href={p.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}{p.linksDisabled && <><button className="btn" type="button" disabled aria-disabled="true">GitHub · Planned</button><button className="btn p" type="button" disabled aria-disabled="true">Live demo · Planned</button></>}</div>
          <Tilt style={{ marginTop: 18 }}><h3>My role</h3><p>{p.contribution}</p></Tilt>
        </section>
        {p.problem && <Sec id="problem" title="Problem & solution"><div className="two"><Tilt><span className="eyebrow">Problem</span><p>{p.problem}</p></Tilt><Tilt><span className="eyebrow">Solution</span><p>{p.solution}</p></Tilt></div>{p.outcome && <p className="note" style={{ marginTop: 16 }}><strong>Outcome:</strong> {p.outcome}</p>}</Sec>}
        <Sec id="features" title="Features & status"><div className="glass"><ul className="ck" style={{ listStyle: 'none', padding: 0 }}>{p.features.map((f) => <li key={f.text} className="row"><span>{f.text}</span><Badge status={f.status} /></li>)}</ul></div></Sec>
        {p.decisions && <Sec id="decisions" title="Technical decisions"><div className="grid">{p.decisions.map((x, i) => <Tilt key={x}><span className="eyebrow">0{i + 1}</span><p>{x}</p></Tilt>)}</div></Sec>}
        {p.challenge && <Sec id="challenge" title="A problem I solved"><div className="two"><Tilt><span className="eyebrow">Issue</span><p>{p.challenge.issue}</p></Tilt><Tilt><span className="eyebrow">Fix</span><p>{p.challenge.fix}</p></Tilt></div></Sec>}
        {d && <Sec id="architecture" title="Architecture"><Diagram key={d.id} nodes={d.nodes} edges={d.edges} selected={sel} onSelect={setSel} />{node && <div className="glass" style={{ marginTop: 14 }}><div className="row"><h3>{node.name}</h3><Badge status={node.status} /></div><p>{node.does}</p></div>}<Link className="btn" style={{ marginTop: 14 }} to={`/architecture?d=${p.id}`}>Full interactive view →</Link></Sec>}
        {p.screenshots?.length > 0 && <Sec id="gallery" title="Screenshots"><div className="grid">{p.screenshots.map((s) => <div className="frame" key={s}><div className="term-bar"><i /><i /><i /></div><img src={s} alt={`${p.name} screenshot`} loading="lazy" /></div>)}</div></Sec>}
        <Sec id="stack" title="Tech stack"><Chips items={p.stack} /></Sec>
      </div>
    </div>
  </div>)
}
