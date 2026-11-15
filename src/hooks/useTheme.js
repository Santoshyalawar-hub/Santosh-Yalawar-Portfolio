import { useCallback, useEffect, useState } from 'react'
const KEY = 'theme'
const initial = () => { try { const s = localStorage.getItem(KEY); if (s) return s } catch { /* ignore */ } return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
export function useTheme() {
  const [theme, setTheme] = useState(initial)
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem(KEY, theme) } catch { /* ignore */ } }, [theme])
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return [theme, toggle]
}
