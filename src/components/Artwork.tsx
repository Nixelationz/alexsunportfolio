import { profile } from '../content'

export default function Artwork({ className = '', variant = '' }: { className?: string; variant?: string }) {
  const url = variant === 'alternate' ? profile.alternateArtworkUrl || profile.artworkUrl : profile.artworkUrl
  if (url) return <div className={'oc-artwork supplied-artwork ' + className}><img src={url} alt="Alexander Sun's original character" /></div>
  return <div className={'oc-artwork ' + className + ' ' + variant} role="img" aria-label="Placeholder for original character artwork">
    <div className="oc-mark" aria-hidden="true"><span>:D</span><i /><b /></div>
    <span className="artwork-caption">OC ARTWORK COMING SOON</span>
  </div>
}
