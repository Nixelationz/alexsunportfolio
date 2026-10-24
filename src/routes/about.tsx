import { createFileRoute } from '@tanstack/react-router'
import Artwork from '../components/Artwork'
import { profile } from '../content'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({ meta: [{ title: 'About Me | Alex Sun' }] }),
})

function About() {
  return <main id="main" className="wrap about-page">
    <h1 className="sr-only">About Alexander Sun</h1>
    <section className="bio-section" aria-label="Introduction">
      <Artwork />
      <div className="speech-panel">
        <p>My name is Alexander Sun.</p>
        <p>I am currently a <span className="blank-detail">{profile.role || '[role]'}</span> at <span className="blank-detail">{profile.university || '[university]'}</span> and I am based in the <strong>Los Angeles area</strong>!</p>
      </div>
    </section>
    <section className="bio-section reverse" aria-label="Interests">
      <Artwork variant="alternate" />
      <div className="speech-panel">
        <p>I am interested in <strong>Roblox</strong>, <strong>computers</strong>, <strong>data science</strong>, <strong>AI</strong>, and <strong>mathematics</strong>!</p>
        <p>I hope I can get a job in the tech industry!</p>
      </div>
    </section>
    <section className="history-section" aria-labelledby="history-title">
      <div className="history-heading"><h2 id="history-title">MY ROBLOX STORY</h2><span>2017 — 2026</span></div>
      {profile.historyArtworkUrl ? <img className="history-supplied" src={profile.historyArtworkUrl} alt="My yearly Roblox avatars fighting, 2017 to 2026" /> : <div className="history-artwork" role="img" aria-label="Placeholder for yearly Roblox avatars fighting, 2017 to 2026">
        <div className="avatar-years" aria-hidden="true">{['2017', '2019', '2022', '2024', '2026'].map((year, i) => <div className="year-avatar" key={year} style={{ '--avatar-color': ['#00bde8', '#597aff', '#ce8df5', '#54dbbe', '#1414ff'][i] } as React.CSSProperties}><div className="block-avatar"><i /><b /><span /><em /></div><small>{year}</small></div>)}</div>
        <span className="artwork-caption">YEARLY AVATAR ARTWORK COMING SOON</span>
      </div>}
      <div className="speech-panel history-copy"><p>I have been playing Roblox since <strong>April 29th, 2017</strong> (as a guest) and created my account on <strong>August 3rd, 2017</strong>.</p></div>
    </section>
  </main>
}
