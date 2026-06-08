import { Outlet, NavLink, Link } from 'react-router-dom'
import { ArrowUpRight, BriefcaseBusiness, Code2, Cpu, Home, Mail } from 'lucide-react'
import { portfolio } from '../data/portfolio'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/projects', label: 'Projects', icon: Code2 },
  { to: '/skills', label: 'Skills', icon: Cpu },
  { to: '/experience', label: 'Experience', icon: BriefcaseBusiness },
  { to: '/contact', label: 'Contact', icon: Mail },
]

const Layout = () => {
  const { person } = portfolio

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <Link className="brand" to="/">
          <span>{person.name}</span>
          <small>{person.role}</small>
        </Link>

        <div className="nav-links">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to={to} key={to}>
              <Icon aria-hidden="true" size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <a className="nav-cta" href={`mailto:${person.email}`}>
          Hire me
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </nav>

      <Outlet />
    </main>
  )
}

export default Layout
