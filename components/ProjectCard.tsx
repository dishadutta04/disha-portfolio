import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { GitHubMark, Icon } from "./Symbols";

// Cover for projects without screenshots: the app icon over its pipeline.
function DiagramCover({ project }: { project: Project }) {
  const steps = project.architecture.tiers.map((t) => t.title);
  return (
    <div className="cover-diagram" style={{ "--accent": project.accent } as React.CSSProperties}>
      <Image src={`/projects/${project.slug}/icon.svg`} alt="" width={56} height={56} className="cover-icon" />
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cover = project.shots[0];
  return (
    <article className="card project-card">
      <Link href={`/projects/${project.slug}`} className="project-cover" aria-label={`${project.name} case study`}>
        {cover ? (
          <Image src={cover.src} alt={cover.caption} width={1440} height={900} sizes="(max-width: 900px) 100vw, 50vw" />
        ) : (
          <DiagramCover project={project} />
        )}
        <span className="cover-badge">
          Case study {String(index + 1).padStart(2, "0")}
        </span>
      </Link>
      <div className="project-body">
        <div className="project-title">
          <Image src={`/projects/${project.slug}/icon.svg`} alt="" width={28} height={28} />
          <div>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
            <p>{project.category}</p>
          </div>
          <span className="project-year">{project.year}</span>
        </div>
        <p className="project-tagline">{project.tagline}</p>
        <ul className="chips">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {project.stack.length > 5 && <li className="chip-more">+{project.stack.length - 5}</li>}
        </ul>
        <div className="project-foot">
          <a href={project.repo} target="_blank" rel="noreferrer" className="repo-link">
            <GitHubMark size={13} /> github / {project.repoName}
          </a>
          <span className="lang">
            <i style={{ background: project.languageColor }} />
            {project.language}
          </span>
        </div>
        <ul className="project-includes" aria-label="This case study includes">
          <li>
            <Icon name="photo" size={13} /> {project.shots.length ? `${project.shots.length} screens` : "Diagrams"}
          </li>
          <li>
            <Icon name="layers" size={13} /> Architecture
          </li>
          <li>
            <Icon name="flow" size={13} /> User flow
          </li>
          {project.video && (
            <li>
              <Icon name="play" size={12} /> Demo video
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
