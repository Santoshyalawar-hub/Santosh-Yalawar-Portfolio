// Shared interactive diagram: nodes {id,name,x,y,status}, edges [from,to]. Animated data packets travel each edge.
export default function Diagram({ nodes, edges, selected, onSelect }) {
  const by = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const motion = typeof matchMedia === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches
  const hot = (a, b) => selected && (a === selected || b === selected)
  return (
    <div className="dwrap glass"><div className="diag">
      <svg viewBox="0 0 200 100" aria-hidden="true">
        {edges.map(([a, b], i) => {
          const d = `M${by[a].x * 2},${by[a].y} L${by[b].x * 2},${by[b].y}`
          return (<g key={a + b}><path d={d} className={`edge ${hot(a, b) ? 'hot' : ''}`} />
            {motion && <circle r="1.3" className="packet"><animateMotion dur={`${2.2 + (i % 3) * .5}s`} begin={`${i * .35}s`} repeatCount="indefinite" path={d} /></circle>}</g>)
        })}
      </svg>
      {nodes.map((n) => <button key={n.id} className={`node s-${n.status} ${selected === n.id ? 'on' : ''}`} style={{ left: `${n.x}%`, top: `${n.y}%` }} onClick={() => onSelect(n.id)}><i />{n.name}</button>)}
    </div></div>
  )
}
