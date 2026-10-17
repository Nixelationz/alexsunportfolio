import { createFileRoute } from '@tanstack/react-router'
import { ProjectBrowser } from '../components/Projects'
export const Route=createFileRoute('/portfolio')({component:Portfolio,head:()=>({meta:[{title:'Projects | Alex Sun'}]})})
function Portfolio(){return <main className="wrap inner"><p className="eyebrow">An evolving collection</p><h1>Projects<span className="cyan">.</span></h1><p className="intro">Things I've built, ideas I've explored,<br/>and experiments along the way.</p><ProjectBrowser/></main>}
