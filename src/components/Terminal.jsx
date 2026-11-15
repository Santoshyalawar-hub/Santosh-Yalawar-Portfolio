import { useEffect, useState } from 'react'
// Illustrative snippet (not production code) typed out live.
const CODE = `@RestController
@RequestMapping("/api/users")
public class UserController {

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public List<UserDto> list(Principal p) {
    return service.findByTenant(p);
  }
}`
export default function Terminal() {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { const t = setTimeout(() => setN(CODE.length), 0); return () => clearTimeout(t) }
    const t = setInterval(() => setN((c) => (c >= CODE.length + 40 ? 0 : c + 1)), 55)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="term" role="img" aria-label="Illustrative Spring Boot controller code">
      <div className="term-bar"><i /><i /><i /><span>UserController.java</span></div>
      <pre>{CODE.slice(0, n)}<b className="caret" /></pre>
    </div>
  )
}
