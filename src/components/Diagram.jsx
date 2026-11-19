import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const WORLD_WIDTH = 1100
const WORLD_HEIGHT = 760
const MIN_ZOOM = 0.3
const MAX_ZOOM = 2.5
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)
const defaults = (nodes) => Object.fromEntries(nodes.map((n) => [n.id, { x: n.x / 100 * WORLD_WIDTH, y: n.y / 100 * WORLD_HEIGHT, w: n.w ?? 150, h: n.h ?? 66 }]))

export default function Diagram({ id, nodes, edges, selected, onSelect }) {
  const viewportRef = useRef(null), worldRef = useRef(null), controlsRef = useRef(null), nodeRefs = useRef({})
  const viewRef = useRef({ x: 0, y: 0, k: 1 }), pointersRef = useRef(new Map()), gestureRef = useRef(null), frameRef = useRef(0), saveRef = useRef(0)
  const [positions, setPositions] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(`arch-layout-${id}`)); if (saved && nodes.every((n) => saved[n.id])) return saved } catch {}
    return defaults(nodes)
  })
  const positionsRef = useRef(positions), [zoomPercent, setZoomPercent] = useState(100), [lineStyle, setLineStyle] = useState('Curved'), [fullscreen, setFullscreen] = useState(false)
  const [hint, setHint] = useState(true), reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const updatePositions = (next) => { positionsRef.current = next; setPositions(next); clearTimeout(saveRef.current); saveRef.current = setTimeout(() => { try { localStorage.setItem(`arch-layout-${id}`, JSON.stringify(next)) } catch {} }, 80) }
  const bounds = useCallback((p = positionsRef.current) => {
    const boxes = nodes.map((n) => { const a = p[n.id]; return { l: a.x-a.w/2, r: a.x+a.w/2, t: a.y-a.h/2, b: a.y+a.h/2 } })
    return { l: Math.min(...boxes.map((b)=>b.l)), r: Math.max(...boxes.map((b)=>b.r)), t: Math.min(...boxes.map((b)=>b.t)), b: Math.max(...boxes.map((b)=>b.b)) }
  }, [nodes])
  const constrain = useCallback((v) => {
    const b = bounds(), w = viewportRef.current?.clientWidth || 1, h = viewportRef.current?.clientHeight || 1, margin = 100
    const minX = margin - b.r*v.k, maxX = w - margin - b.l*v.k, minY = margin - b.b*v.k, maxY = h - margin - b.t*v.k
    return { ...v, x: minX > maxX ? (minX+maxX)/2 : clamp(v.x,minX,maxX), y: minY > maxY ? (minY+maxY)/2 : clamp(v.y,minY,maxY) }
  }, [bounds])
  const applyView = useCallback((v, animate = false) => {
    const next = constrain(v); viewRef.current = next
    cancelAnimationFrame(frameRef.current)
    if (animate) viewportRef.current?.classList.add('fit-animate')
    frameRef.current = requestAnimationFrame(() => { if (worldRef.current) worldRef.current.style.transform = `translate(${next.x}px,${next.y}px) scale(${next.k})`; viewportRef.current?.classList.toggle('zoom-low', next.k < .5); if (animate) setTimeout(() => viewportRef.current?.classList.remove('fit-animate'), 280) })
    return next
  }, [constrain])
  const fit = useCallback(() => {
    const v = viewportRef.current; if (!v) return
    const b = bounds(), pad = 40, k = clamp(Math.min((v.clientWidth-pad*2)/(b.r-b.l),(v.clientHeight-pad*2)/(b.b-b.t)),MIN_ZOOM,MAX_ZOOM)
    const next = applyView({ k, x: (v.clientWidth-(b.r-b.l)*k)/2-b.l*k, y: (v.clientHeight-(b.b-b.t)*k)/2-b.t*k }, true); setZoomPercent(Math.round(next.k*100))
  }, [applyView,bounds])
  const fitRef = useRef(fit); useLayoutEffect(() => { fitRef.current = fit; fit() }, [fit])
  useEffect(() => { const v=viewportRef.current; if(!v)return; const ro=new ResizeObserver(()=>fitRef.current()); ro.observe(v); return()=>{ro.disconnect();cancelAnimationFrame(frameRef.current);clearTimeout(saveRef.current)} }, [])
  useEffect(() => { const onKey=(e)=>{ if(e.key==='Escape'&&fullscreen){document.exitFullscreen?.();setFullscreen(false)} }; document.addEventListener('keydown',onKey); return()=>document.removeEventListener('keydown',onKey) },[fullscreen])
  const zoomAt = (k, point) => { const v=viewportRef.current;if(!v)return;const r=v.getBoundingClientRect(),p=point??{x:v.clientWidth/2,y:v.clientHeight/2},old=viewRef.current,nk=clamp(k,MIN_ZOOM,MAX_ZOOM),wx=(p.x-old.x)/old.k,wy=(p.y-old.y)/old.k,next=applyView({x:p.x-wx*nk,y:p.y-wy*nk,k:nk});setZoomPercent(Math.round(next.k*100)) }
  useEffect(() => { const v=viewportRef.current;if(!v)return;const wheel=(e)=>{e.preventDefault();if(e.shiftKey){applyView({...viewRef.current,x:viewRef.current.x-e.deltaY-e.deltaX});return} if(e.ctrlKey||Math.abs(e.deltaY)>0)zoomAt(viewRef.current.k*Math.exp(-e.deltaY*.0015),{x:e.clientX-v.getBoundingClientRect().left,y:e.clientY-v.getBoundingClientRect().top})};v.addEventListener('wheel',wheel,{passive:false});return()=>v.removeEventListener('wheel',wheel) })
  const startBackground = (e) => { if(e.button!==0||e.target.closest('.node,.diagram-controls'))return;e.preventDefault();e.currentTarget.focus({preventScroll:true});e.currentTarget.setPointerCapture(e.pointerId);setHint(false);pointersRef.current.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointersRef.current.size>=2){const [a,b]=[...pointersRef.current.values()].slice(0,2),m=midpoint(a,b),v=viewRef.current,r=e.currentTarget.getBoundingClientRect();gestureRef.current={type:'pinch',dist:Math.max(1,distance(a,b)),k:v.k,wx:(m.x-r.left-v.x)/v.k,wy:(m.y-r.top-v.y)/v.k}}else gestureRef.current={type:'pan',id:e.pointerId,x:e.clientX,y:e.clientY,v:{...viewRef.current}} }
  const moveBackground=(e)=>{if(!pointersRef.current.has(e.pointerId))return;pointersRef.current.set(e.pointerId,{x:e.clientX,y:e.clientY});const g=gestureRef.current;if(g?.type==='pinch'&&pointersRef.current.size>1){const [a,b]=[...pointersRef.current.values()],m=midpoint(a,b),r=viewportRef.current.getBoundingClientRect(),k=clamp(g.k*distance(a,b)/g.dist,MIN_ZOOM,MAX_ZOOM),n=applyView({x:m.x-r.left-g.wx*k,y:m.y-r.top-g.wy*k,k});setZoomPercent(Math.round(n.k*100))}else if(g?.type==='pan'&&g.id===e.pointerId)applyView({...g.v,x:g.v.x+e.clientX-g.x,y:g.v.y+e.clientY-g.y}) }
  const endBackground=(e)=>{pointersRef.current.delete(e.pointerId);if(!pointersRef.current.size)gestureRef.current=null}
  const moveNode=(e)=>{const g=gestureRef.current;if(g?.type!=='node'||g.pid!==e.pointerId)return;const k=viewRef.current.k,dx=(e.clientX-g.x)/k,dy=(e.clientY-g.y)/k;if(Math.hypot(dx,dy)<2&&!g.moved)return;g.moved=true;updatePositions({...positionsRef.current,[g.id]:{...g.start,x:g.start.x+dx,y:g.start.y+dy}})}
  const startNode=(e,n)=>{if(e.button!==0)return;e.stopPropagation();e.currentTarget.setPointerCapture(e.pointerId);setHint(false);onSelect(n.id);gestureRef.current={type:e.target.classList.contains('resize-handle')?'resize':'node',id:n.id,pid:e.pointerId,x:e.clientX,y:e.clientY,start:positionsRef.current[n.id],moved:false}}
  const endNode=(e)=>{if(gestureRef.current?.pid===e.pointerId)gestureRef.current=null}
  const resizeNode=(e)=>{const g=gestureRef.current;if(g?.type!=='resize'||g.pid!==e.pointerId)return;const k=viewRef.current.k;updatePositions({...positionsRef.current,[g.id]:{...g.start,w:clamp(g.start.w+(e.clientX-g.x)/k,90,420),h:clamp(g.start.h+(e.clientY-g.y)/k,40,300)}})}
  const resetLayout=()=>updatePositions(defaults(nodes))
  const autoArrange=()=>{const next=defaults(nodes), layers=[[],[],[],[]]; nodes.forEach((n)=>{const d=n.name.toLowerCase();const i=/client|visitor|merchant app|dashboard/.test(d)?0:/gateway|filter/.test(d)?1:/redis|postgres|mysql|database|ledger/.test(d)?3:2;layers[i].push(n)});layers.forEach((layer,x)=>layer.forEach((n,i)=>{next[n.id]={...next[n.id],x:100+x*280,y:100+i*120}}));updatePositions(next)}
  const edgePath=(from,to)=>{const a=positions[from],b=positions[to];if(!a||!b)return '';const dx=b.x-a.x,dy=b.y-a.y,len=Math.max(1,Math.hypot(dx,dy)),ux=dx/len,uy=dy/len,ra=Math.min(a.w/2/Math.max(.001,Math.abs(ux)),a.h/2/Math.max(.001,Math.abs(uy))),rb=Math.min(b.w/2/Math.max(.001,Math.abs(ux)),b.h/2/Math.max(.001,Math.abs(uy))),sx=a.x+ux*ra,sy=a.y+uy*ra,ex=b.x-ux*rb,ey=b.y-uy*rb;if(lineStyle==='Straight')return `M${sx},${sy} L${ex},${ey}`;if(lineStyle==='Right-angle'){const mx=(sx+ex)/2;return `M${sx},${sy} L${mx},${sy} L${mx},${ey} L${ex},${ey}`}const bend=Math.max(48,Math.abs(ex-sx)*.42);return `M${sx},${sy} C${sx+bend},${sy} ${ex-bend},${ey} ${ex},${ey}`}
  const doubleClick=(e,n)=>{e.stopPropagation();if(!n)return;updatePositions({...positionsRef.current,[n.id]:{...positionsRef.current[n.id],w:n.w??150,h:n.h??66}})}
  return <div className={`dwrap glass ${fullscreen?'diagram-fullscreen':''}`}><div ref={viewportRef} className="diagram-viewport" tabIndex={0} role="region" aria-label="Interactive architecture diagram" onPointerDown={startBackground} onPointerMove={moveBackground} onPointerUp={endBackground} onPointerCancel={endBackground} onKeyDown={(e)=>{if(e.target.closest('.diagram-controls'))return;const step=50,v=viewRef.current;if(e.key.startsWith('Arrow')){e.preventDefault();applyView({...v,x:v.x+(e.key==='ArrowLeft'?step:e.key==='ArrowRight'?-step:0),y:v.y+(e.key==='ArrowUp'?step:e.key==='ArrowDown'?-step:0)})}else if(e.key==='+'||e.key==='=')zoomAt(v.k*1.2);else if(e.key==='-')zoomAt(v.k/1.2);else if(e.key==='0')fit()}}>
    <div ref={worldRef} className="diagram-world" style={{width:WORLD_WIDTH,height:WORLD_HEIGHT}}><svg className="diagram-edges" width={WORLD_WIDTH} height={WORLD_HEIGHT} aria-hidden="true">{edges.map(([a,b],i)=>{const d=edgePath(a,b);return <g key={`${a}-${b}`}><path d={d} className="edge" markerEnd="url(#arrow)" />{!reducedMotion&&<circle r="4" className="packet"><animateMotion dur={`${2.2+(i%3)*.5}s`} begin={`${i*.35}s`} repeatCount="indefinite" path={d}/></circle>}</g>})}<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--ac)"/></marker></defs></svg>{nodes.map((n)=><button key={n.id} ref={(el)=>{nodeRefs.current[n.id]=el}} className={`node s-${n.status} ${n.core?'core':''} ${selected===n.id?'on':''}`} style={{left:positions[n.id].x,top:positions[n.id].y,width:positions[n.id].w,height:positions[n.id].h}} onPointerDown={(e)=>startNode(e,n)} onPointerMove={(e)=>{moveNode(e);resizeNode(e)}} onPointerUp={endNode} onPointerCancel={endNode} onDoubleClick={(e)=>doubleClick(e,n)}><i/><span>{n.name}</span>{positions[n.id].h>88&&<small>{n.does}</small>}<span className="resize-handle" aria-label={`Resize ${n.name}`} onPointerDown={(e)=>{e.stopPropagation();startNode(e,n)}}/></button>)}</div>
    {hint&&<div className="diagram-hint">Drag background to pan · wheel to zoom</div>}<div ref={controlsRef} className="diagram-controls glass" role="group" aria-label="Diagram controls" onPointerDown={(e)=>e.stopPropagation()}><span className="diagram-zoom" aria-live="polite">{zoomPercent}%</span><button className="btn" aria-label="Zoom in" onClick={()=>zoomAt(viewRef.current.k*1.2)}>+</button><button className="btn" aria-label="Zoom out" onClick={()=>zoomAt(viewRef.current.k/1.2)}>−</button><button className="btn" aria-label="Fit diagram" onClick={fit}>Fit</button><button className="btn" aria-label="Reset view" onClick={fit}>Reset view</button><button className="btn" aria-label="Reset layout" onClick={resetLayout}>Reset layout</button><button className="btn" aria-label="Auto-arrange" onClick={autoArrange}>Auto-arrange</button><select aria-label="Line style" value={lineStyle} onChange={(e)=>setLineStyle(e.target.value)}><option>Curved</option><option>Straight</option><option>Right-angle</option></select><button className="btn" aria-label="Toggle fullscreen" onClick={()=>{if(!fullscreen){viewportRef.current?.requestFullscreen?.();setFullscreen(true)}else{document.exitFullscreen?.();setFullscreen(false)}}}>Fullscreen</button></div>
  </div></div>
}
