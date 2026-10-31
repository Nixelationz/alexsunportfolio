export default function Footer() {
  return <footer className="wrap"><span>ALEX SUN</span><span>© {new Date().getFullYear()} / alexsun.xyz</span><time dateTime={__BUILD_DATE__}>LAST UPDATED: {new Date(`${__BUILD_DATE__}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time><a href="#main">BACK TO TOP ↑</a></footer>
}
