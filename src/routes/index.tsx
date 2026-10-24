import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import Artwork from '../components/Artwork'
import { profile } from '../content'
import PixelIcon from '../components/PixelIcon'

const AvatarScene = lazy(() => import('../components/AvatarScene'))
export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({ meta: [{ title: 'Alex Sun | Home' }, { name: 'description', content: 'Alexander Sun: Roblox, computers, data science, AI, and mathematics.' }] }),
})

function Home() {
  return <main id="main">
    <section className="home-hero wrap" aria-labelledby="home-title">
      <Artwork className="hero-artwork" />
      <div className="hero-avatar"><Suspense fallback={<p className="loading">Loading character...</p>}><AvatarScene /></Suspense></div>
      <h1 id="home-title">ALEX SUN</h1>
      <a className="scroll-cue" href="#socials" aria-label="Scroll to social links">↓</a>
    </section>
    <section id="socials" className="social-section wrap" aria-label="Find me online">
      {profile.socials.map(social => <div className="social-row" key={social.name}>
        <PixelIcon name={social.icon} />
        {social.url ? <a href={social.url} target="_blank" rel="noreferrer">My {social.name}<span aria-hidden="true"> ↗</span></a> : <span className="social-pending">My {social.name}<small>LINK COMING SOON</small></span>}
      </div>)}
    </section>
  </main>
}
