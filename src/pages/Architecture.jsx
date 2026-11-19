import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { diagrams } from '../data/architecture'
import Diagram from '../components/Diagram'
import { Head, Badge, Chips } from '../components/ui'
const L = ({ t, items }) => <div><span className="eyebrow">{t}</span>{items.length ? <Chips items={items} /> : <p>None</p>}</div>
export default function Architecture() {
  const [sp, setSp] = useSearchParams()
  const d = diagrams.find((x) => x.id === sp.get('d')) ?? diagrams[0]
  const [sel, setSel] = useState(null)
  const node = d.nodes.find((n) => n.id === sel)
  const by = Object.fromEntries(d.nodes.map((n) => [n.id, n]))
  return (<div className="wrap page">
    <Head eyebrow="Architecture" title="Interactive system diagrams" text="Click any component to see its role, APIs, events and ownership." />
    <div className="seg">{diagrams.map((x) => <button key={x.id} className={`btn ${x.id === d.id ? 'on' : ''}`} onClick={() => { setSp({ d: x.id }); setSel(null) }}>{x.title.split(':')[0]}</button>)}</div>
    {d.confidential && <p className="note" style={{ marginBottom: 16 }}>Generalized view of a company project. Names and internals are intentionally simplified.</p>}
    <Diagram key={d.id} id={d.id} nodes={d.nodes} edges={d.edges} selected={sel} onSelect={setSel} />
    <div className="glass stack" style={{ marginTop: 20 }} aria-live="polite">
      {node ? (<><div className="row"><h3>{node.name}</h3><Badge status={node.status} /></div><p>{node.does}</p>
        <div className="two"><L t="APIs" items={node.apis} /><L t="Depends on" items={node.deps.map((i) => by[i]?.name ?? i)} /><L t="Produces events" items={node.produces} /><L t="Consumes events" items={node.consumes} /></div>
        <p><strong>Data ownership:</strong> {node.owns}</p></>) : <p>Select a component to explore it.</p>}
    </div>
  </div>)
}
