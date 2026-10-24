import { projects } from '../content'

export function ProjectList() {
  return <div className="project-grid">{projects.map(project => <article className="project" key={project.title}>
    {project.imageUrl ? <figure className="project-image">
      <img className="project-screenshot" src={project.imageUrl} alt={project.imageAlt ?? project.title + ' screenshot'} />
      {project.imageCaption && project.imageCaptionLink && project.imageCaptionUrl && <figcaption className="project-image-caption">
        {project.imageCaption} (<a href={project.imageCaptionUrl} target="_blank" rel="noreferrer">{project.imageCaptionLink}</a>)
      </figcaption>}
    </figure> : <div className={'project-placeholder ' + project.art} role="img" aria-label={'Screenshot placeholder for ' + project.title}>
      {project.art === 'tower-art' ? <div className="tower-blocks" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <span key={i} style={{ height: (45 + i * 19) + 'px' }} />)}</div> : <div className="pangram-letters" aria-hidden="true"><span>A</span><span>a</span><span>Z</span></div>}
      <span className="artwork-caption">SCREENSHOT COMING SOON</span>
    </div>}
    <h2>{project.title}</h2><p className="project-date">Started <time dateTime={project.date}>{project.dateLabel}</time></p>
    {project.wip && <span className="wip">WIP</span>}
    <p className="project-description">{project.description}</p>
    {project.url && <a className="pixel-link" href={project.url} target="_blank" rel="noreferrer">OPEN PROJECT ↗</a>}
  </article>)}</div>
}
