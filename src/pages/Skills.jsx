import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { skillCategories, techMap } from '../data/skills'
import { projects } from '../data/projects'
import Diagram from '../components/Diagram'
import { Head, Tilt, CountUp, Logo } from '../components/ui'

const all = skillCategories.flatMap((c) => c.items)
const stats = [['Strong', all.filter((s) => s.level === 'Strong').length], ['Working', all.filter((s) => s.level === 'Working').length], ['Learning', all.filter((s) => s.level === 'Learning').length], ['Projects', projects.length]]
const withProof = all.filter((s) => s.proof.length)
const filters = [['all','All'],['backend','Backend'],['frontend','Frontend'],['data','Data'],['testing','Testing'],['devops','DevOps'],['aiml','AI-ML'],['learning','Learning']]
const plannedUse = { 'Spring Boot REST':['payflow','personaai'], 'Spring Security + JWT':['payflow','personaai'], 'PostgreSQL':['payflow','personaai'], Redis:['payflow','personaai'], 'Apache Kafka':['payflow','personaai'], 'React + Vite':['payflow','personaai'], 'JUnit 5':['payflow'], Mockito:['payflow'], Testcontainers:['payflow'], 'Swagger/OpenAPI':['payflow'], 'GitHub Actions CI':['payflow'], Python:['personaai'], LLMs:['personaai'], RAG:['personaai'], 'Spring AI / LangChain4j':['personaai'], 'Vector DB (pgvector)':['personaai'], 'AI Evaluation and Safety':['personaai'] }
export default function Skills() {
  const [cat,setCat]=useState('all'),[mapFilter,setMapFilter]=useState('all'),[sel,setSel]=useState('boot'),[viewDiagram,setViewDiagram]=useState(false)
  const node=techMap.nodes.find((n)=>n.id===sel), skill=all.find((s)=>s.name===node?.skill), ids=useMemo(()=>{
    if(mapFilter==='all')return null
    return techMap.nodes.filter((n)=>mapFilter==='learning'?n.level==='Learning':n.category===mapFilter).map((n)=>n.id)
  },[mapFilter])
  const proof=skill?.proof??[], planned=plannedUse[node?.skill]??[]
  return <div className="wrap page stack-lg">
    <Head eyebrow="Skills dashboard" title="What I use, and where I've proven it" text="Clear proficiency labels distinguish hands-on strengths, growing experience, and skills I'm currently learning." />
    <div className="grid">{stats.map(([l,v])=><Tilt className="stat" key={l}><strong className="grad"><CountUp to={v}/></strong>{l}</Tilt>)}</div>
    <section className="stack-map-section"><h3 className="sec">Stack map <small>select a skill</small></h3>
      <div className="seg skill-filters" role="group" aria-label="Filter stack map">{filters.map(([id,label])=><button key={id} className={`btn ${mapFilter===id?'on':''}`} aria-pressed={mapFilter===id} onClick={()=>setMapFilter(id)}>{label}</button>)}</div>
      <div className="skill-legend" aria-label="Proficiency legend"><span><i className="level-dot strong"/>Strong</span><span><i className="level-dot working"/>Working</span><span><i className="level-dot learning"/>Learning</span></div>
      <button className="btn diagram-toggle" type="button" onClick={()=>setViewDiagram(!viewDiagram)}>{viewDiagram?'Hide diagram':'View diagram'}</button>
      <div className={`skill-diagram ${viewDiagram?'show-mobile':''}`}><Diagram id="stackmap" nodes={techMap.nodes} edges={techMap.edges} groups={techMap.groups} selected={sel} onSelect={setSel} highlightIds={ids} defaultLineStyle="Right-angle" /></div>
      <div className="glass skill-details" aria-live="polite"><div className="row"><h3>{node?.name}</h3><span className={`skill-level level-${skill?.level.toLowerCase()}`}>{skill?.level}</span></div><p>{node?.does||skill?.does}</p><p><strong>Used in:</strong> {[...proof.map((id)=>({id,planned:false})),...planned.filter((id)=>!proof.includes(id)).map((id)=>({id,planned:true}))].length ? [...proof.map((id)=>({id,planned:false})),...planned.filter((id)=>!proof.includes(id)).map((id)=>({id,planned:true}))].map(({id,planned:p})=>{const project=projects.find((x)=>x.id===id);return <a className="skill-project" key={id} href={`/projects/${id}`}>{project?.name}{p?' (Planned)':''}</a>}) : 'No project evidence yet'}</p></div>
    </section>
    <section><h3 className="sec">Skill library</h3><div className="seg" role="tablist">{[{id:'all',title:'All'},...skillCategories].map((c)=><button key={c.id} role="tab" aria-selected={cat===c.id} className={`btn ${cat===c.id?'on':''}`} onClick={()=>setCat(c.id)}>{c.title}</button>)}</div>
      <div className="grid">{(cat==='all'?skillCategories:skillCategories.filter((c)=>c.id===cat)).map((c)=><Tilt key={c.id}><div className="row"><h3>{c.title}</h3>{c.id==='aiml'&&<span className="skill-level level-learning">Currently learning</span>}</div>{c.id==='aiml'&&<p className="learning-intro">Building PersonaAI (RAG assistant) to apply these skills.</p>}<div className="skl">{c.items.map((i)=><motion.span layout key={i.name} className={`sk level-${i.level.toLowerCase()}`} title={i.level}><Logo name={i.name}/>{i.name}<small>{i.level}</small></motion.span>)}</div></Tilt>)}</div>
    </section>
    <section><h3 className="sec">Evidence matrix <small>skill × project</small></h3><div className="dwrap glass"><table className="matrix"><thead><tr><th>Skill</th>{projects.map((p)=><th key={p.id}>{p.name}</th>)}</tr></thead><tbody>{withProof.map((s)=><tr key={s.name}><th scope="row">{s.name}</th>{projects.map((p)=><td key={p.id}>{s.proof.includes(p.id)?<span className={`mk ${s.level.toLowerCase()}`} aria-label={s.level}/>:''}</td>)}</tr>)}</tbody></table></div></section>
  </div>
}
