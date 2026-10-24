import { Link } from '@tanstack/react-router'

export default function Header() {
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <nav className="wrap" aria-label="Main navigation">
      <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'active' }}>HOME</Link>
      <Link to="/about" activeProps={{ className: 'active' }}>ABOUT ME</Link>
      <Link to="/portfolio" activeProps={{ className: 'active' }}>PROJECTS</Link>
      <Link to="/resume" activeProps={{ className: 'active' }}>RESUME</Link>
    </nav>
  </header>
}
