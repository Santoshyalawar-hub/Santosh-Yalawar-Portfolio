import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { nav } from '../data/profile'
import { projects } from '../data/projects'
import { skillCategories } from '../data/skills'
const all = [...nav.map(([id, l]) => ({ label: l, hint: 'Page', to: id === 'home' ? '/' : `/${id}` })), ...projects.map((p) => ({ label: p.name, hint: 'Project', to: `/projects/${p.id}` })), ...skillCategories.flatMap((c) => c.items.map((s) => ({ label: s.name, hint: `Skill · ${s.level}`, to: '/skills' })))]
export default function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState(''), [i, setI] = useState(0), go = useNavigate(), ref = useRef(null)
  useEffect(() => { if (open) ref.current?.focus() }, [open])
  if (!open) return null
  const list = all.filter((x) => x.label.toLowerCase().includes(q.toLowerCase()))
  const pick = (x) => { if (x) { go(x.to); setOpen(false); setQ('') } }
  const key = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setI((i + 1) % list.length) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setI((i - 1 + list.length) % list.length) }
    if (e.key === 'Enter') pick(list[i])
    if (e.key === 'Escape') setOpen(false)
  }
  return (<div className="cmd-bg" onClick={() => setOpen(false)}><div className="cmd glass" role="dialog" aria-label="Quick navigation" onClick={(e) => e.stopPropagation()}>
    <label className="cmd-in"><Search size={16} /><input ref={ref} value={q} onChange={(e) => { setQ(e.target.value); setI(0) }} onKeyDown={key} placeholder="Jump to a page or project…" /></label>
    <ul>{list.map((x, n) => <li key={x.to}><button className={n === i ? 'on' : ''} onMouseEnter={() => setI(n)} onClick={() => pick(x)}>{x.label}<small>{x.hint}</small></button></li>)}{!list.length && <li className="mut">No results</li>}</ul>
  </div></div>)
}
