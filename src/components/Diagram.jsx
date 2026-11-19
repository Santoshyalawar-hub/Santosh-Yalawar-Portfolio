import { useRef, useState } from 'react'

// Shared interactive diagram: nodes {id,name,x,y,status}, edges [from,to]. Animated data packets travel each edge.
export default function Diagram({ nodes, edges, selected, onSelect }) {
  const [positions, setPositions] = useState(() => Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }])))
  const drag = useRef(null)
  const motion = typeof matchMedia === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches
  const hot = (a, b) => selected && (a === selected || b === selected)
  const startDrag = (e, n) => {
    if (e.button !== 0) return
    const rect = e.currentTarget.parentElement.getBoundingClientRect()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { id: n.id, pointerId: e.pointerId, clientX: e.clientX, clientY: e.clientY, rect, start: positions[n.id] }
  }
  const moveDrag = (e) => {
    const active = drag.current
    if (!active || active.pointerId !== e.pointerId) return
    const clamp = (v) => Math.max(3, Math.min(97, v))
    setPositions((current) => ({ ...current, [active.id]: {
      x: clamp(active.start.x + (e.clientX - active.clientX) / active.rect.width * 100),
      y: clamp(active.start.y + (e.clientY - active.clientY) / active.rect.height * 100),
    } }))
  }
  const endDrag = (e) => {
    if (drag.current?.pointerId === e.pointerId) drag.current = null
  }
  return (
    <div className="dwrap glass"><div className={`diag ${nodes.length > 12 ? 'diag-wide' : ''}`}>
      <svg viewBox="0 0 200 100" aria-hidden="true">
        {edges.map(([a, b], i) => {
          const d = `M${positions[a].x * 2},${positions[a].y} L${positions[b].x * 2},${positions[b].y}`
          return (<g key={a + b}><path d={d} className={`edge ${hot(a, b) ? 'hot' : ''}`} />
            {motion && <circle r="1.3" className="packet"><animateMotion dur={`${2.2 + (i % 3) * .5}s`} begin={`${i * .35}s`} repeatCount="indefinite" path={d} /></circle>}</g>)
        })}
      </svg>
      {nodes.map((n) => <button key={n.id} className={`node s-${n.status} ${n.core ? 'core' : ''} ${selected === n.id ? 'on' : ''}`} style={{ left: `${positions[n.id].x}%`, top: `${positions[n.id].y}%` }} onPointerDown={(e) => startDrag(e, n)} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onClick={() => onSelect(n.id)}><i />{n.name}</button>)}
    </div></div>
  )
}
