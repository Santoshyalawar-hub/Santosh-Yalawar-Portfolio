import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillCategories, techMap } from '../data/skills'
import { projects } from '../data/projects'
import Diagram from '../components/Diagram'
import { Head, Tilt, CountUp, Logo, Badge } from '../components/ui'
const all = skillCategories.flatMap((c) => c.items)
const stats = [['Used in projects', all.filter((s) => s.level === 'used').length], ['Upskilled', all.filter((s) => s.level === 'upskilled').length], ['Categories', skillCategories.length], ['Projects', projects.length]]
const withProof = all.filter((s) => s.proof.length)
export default function Skills() {
  const [cat, setCat] = useState('all')
  const [sel, setSel] = useState('boot')
  const list = cat === 'all' ? skillCategories : skillCategories.filter((c) => c.id === cat)
  const node = techMap.nodes.find((n) => n.id === sel)
  const used = all.find((s) => s.name === node.skill)?.proof ?? []
  return (<div className="wrap page stack-lg">
    <Head eyebrow="Skills dashboard" title="What I use, and where I've proven it" text="Every number is a real count from my data. Solid means used in shipped work; dashed means upskilled." />
    <div className="grid">{stats.map(([l, v]) => <Tilt className="stat" key={l}><strong className="grad"><CountUp to={v} /></strong>{l}</Tilt>)}</div>

    <section><h3 className="sec">Stack map <small>click a node</small></h3>
      <Diagram nodes={techMap.nodes} edges={techMap.edges} selected={sel} onSelect={setSel} />
      <div className="glass" style={{ marginTop: 16 }} aria-live="polite">
        <div className="row"><h3>{node.name}</h3><Badge status={node.status === 'used' ? 'implemented' : 'in-progress'} /></div>
        <p>{node.does}</p>
        <p style={{ marginTop: 8 }}><strong>Used in:</strong> {used.length ? used.map((id) => projects.find((p) => p.id === id)?.name).join(', ') : 'No project evidence yet'}</p>
      </div>
    </section>

    <section><h3 className="sec">Skill library</h3>
      <div className="seg" role="tablist">{[{ id: 'all', title: 'All' }, ...skillCategories].map((c) => <button key={c.id} role="tab" aria-selected={cat === c.id} className={`btn ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>{c.title}</button>)}</div>
      <div className="grid">{list.map((c) => <Tilt key={c.id}><h3>{c.title}</h3><div className="skl">{c.items.map((i) => <motion.span layout key={i.name} className={`sk ${i.level}`} title={i.level}><Logo name={i.name} />{i.name}</motion.span>)}</div></Tilt>)}</div>
    </section>

    <section><h3 className="sec">Evidence matrix <small>skill × project</small></h3>
      <div className="dwrap glass"><table className="matrix"><thead><tr><th>Skill</th>{projects.map((p) => <th key={p.id}>{p.name}</th>)}</tr></thead>
        <tbody>{withProof.map((s) => <tr key={s.name}><th scope="row">{s.name}</th>{projects.map((p) => <td key={p.id}>{s.proof.includes(p.id) ? <span className={`mk ${s.level}`} aria-label="used" /> : ''}</td>)}</tr>)}</tbody></table></div>
    </section>
  </div>)
}
