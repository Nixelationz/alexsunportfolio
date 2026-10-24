import { createFileRoute } from '@tanstack/react-router'
import { ProjectList } from '../components/Projects'

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
  head: () => ({ meta: [{ title: 'Projects | Alex Sun' }] }),
})

function Portfolio() {
  return <main id="main" className="wrap projects-page"><h1 className="sr-only">Projects</h1><ProjectList /></main>
}
