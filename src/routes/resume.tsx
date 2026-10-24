import { createFileRoute } from '@tanstack/react-router'
import { profile } from '../content'

export const Route = createFileRoute('/resume')({
  component: Resume,
  head: () => ({ meta: [{ title: 'Resume | Alex Sun' }] }),
})

function Resume() {
  const url = profile.resumeUrl
  return <main id="main" className="wrap resume-page">
    <h1>THE GLORIOUS RESUME</h1>
    {url ? <><div className="resume-actions"><a href={url} target="_blank" rel="noreferrer">OPEN PDF ↗</a><a href={url} download>DOWNLOAD ↓</a></div><iframe className="resume-document" title="Alexander Sun's resume" src={url} /></> : <div className="resume-empty"><div className="pdf-icon" aria-hidden="true">PDF</div><h2>Resume coming soon.</h2><p>A little more about my experience,<br />all in one place.</p></div>}
  </main>
}
