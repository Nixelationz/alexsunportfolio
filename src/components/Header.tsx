import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getHomepageVisits } from '../server/visits'

export default function Header() {
  const pathname = useRouterState({ select: state => state.location.pathname })
  const [visitCount, setVisitCount] = useState<number | null>(null)
  const [visitCountUnavailable, setVisitCountUnavailable] = useState(false)

  useEffect(() => {
    let active = true

    getHomepageVisits()
      .then(count => {
        if (active) {
          setVisitCount(count)
          setVisitCountUnavailable(false)
        }
      })
      .catch(error => {
        console.error('Failed to load the homepage visit count.', error)
        if (active) setVisitCountUnavailable(true)
      })

    return () => {
      active = false
    }
  }, [pathname])

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
    <p className="header-visits wrap" aria-live="polite">
      {visitCountUnavailable ? 'HOMEPAGE VISITS: UNAVAILABLE' : `HOMEPAGE VISITS: ${visitCount?.toLocaleString() ?? 'LOADING...'}`}
    </p>
  </header>
}
