import { useEffect, useState } from 'react'
export const useRotator = (items, ms = 2200) => {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((c) => (c + 1) % items.length), ms); return () => clearInterval(t) }, [items.length, ms])
  return items[i]
}
