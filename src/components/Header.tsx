import { Link } from '@tanstack/react-router'
export default function Header() {
 return <header><nav className="wrap"><Link to="/" aria-label="Alex Sun home"><img className="logo" src="/alex-sun-logo.svg" alt="Alex Sun" /></Link><div className="nav-links"><Link to="/" activeOptions={{exact:true}} activeProps={{className:'active'}}>Home</Link><Link to="/about" activeProps={{className:'active'}}>About me</Link><Link to="/portfolio" activeProps={{className:'active'}}>Projects</Link></div><a className="connect" href="https://www.linkedin.com/in/actiumsolar/" target="_blank" rel="noreferrer">Let's connect ↗</a></nav></header>
}
