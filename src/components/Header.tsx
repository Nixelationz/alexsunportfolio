import { Link } from '@tanstack/react-router'

export default function Header() {
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <nav className="wrap" aria-label="Main navigation">
      <Link to="/about" activeProps={{ className: 'active' }}>ABOUT ME</Link>
      <Link to="/portfolio" activeProps={{ className: 'active' }}>PROJECTS</Link>
      <Link to="/resume" activeProps={{ className: 'active' }}>RESUME</Link>
      <Link to="/" className="home-logo" aria-label="Alex Sun home" activeOptions={{ exact: true }}>
        <img src="/alex-sun-wordmark.png" alt="Alex Sun" width="1826" height="452" />
      </Link>
    </nav>
  </header>
}
