import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram, UserFlowDiagram } from "@/components/Diagrams";
import { Gallery } from "@/components/Gallery";
import { GitHubMark, Icon } from "@/components/Symbols";
import { SectionHeader } from "@/components/Site";
import { profile, projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

const toc = [
  { id: "overview", label: "Overview", icon: "doc" },
  { id: "screens", label: "Screens", icon: "photo" },
  { id: "case-study", label: "Case study", icon: "sparkles" },
  { id: "architecture", label: "Architecture", icon: "layers" },
  { id: "user-flow", label: "User flow", icon: "flow" },
] as const;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const icon = `/projects/${project.slug}/icon.svg`;
  const hasShots = project.shots.length > 0;

  return (
    <div className="container detail">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/#projects">Projects</Link>
        <Icon name="chevronRight" size={11} strokeWidth={2.2} />
        <span>{project.name}</span>
      </nav>

      {/* Overview */}
      <section className="card detail-hero" id="overview" style={{ "--accent": project.accent } as React.CSSProperties}>
        <Image src={icon} alt="" width={84} height={84} className="detail-icon" />
        <div className="detail-copy">
          <p className="eyebrow">
            {project.category} · {project.year}
          </p>
          <h1>{project.name}</h1>
          <p className="hero-lede">{project.tagline}</p>
          <div className="btn-row">
            <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-primary">
              <GitHubMark size={14} /> View code
            </a>
            {project.video && (
              <a href="#demo" className="btn">
                <Icon name="play" size={12} /> Watch demo
              </a>
            )}
            <a href={profile.resume} className="btn">
              <Icon name="doc" size={14} /> Résumé
            </a>
          </div>
        </div>
        <ul className="detail-stats">
          {project.stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <ul className="toc" aria-label="On this page">
        {toc
          .filter((t) => t.id !== "screens" || hasShots || project.video)
          .map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`}>
                <Icon name={t.icon} size={13} /> {t.label}
              </a>
            </li>
          ))}
      </ul>

      {/* Screens */}
      {(hasShots || project.video) && (
        <>
          <SectionHeader id="screens" title="Screens" sub={hasShots ? "Real screenshots of the running app. Use the arrows or thumbnails." : undefined} />
          {hasShots && <Gallery shots={project.shots} title={project.name} />}
          {project.video && (
            <figure className="mac-frame video-frame" id="demo">
              <div className="mac-frame-bar">
                <span />
                <span />
                <span />
                <p>{project.name} · demo</p>
              </div>
              <video src={project.video} controls preload="metadata" poster={project.shots[0]?.src} />
            </figure>
          )}
        </>
      )}

      {/* Case study */}
      <SectionHeader id="case-study" title="Case study" />
      <div className="cs-grid">
        <section className="card cs-card">
          <h3>
            <span className="cs-icon cs-red">
              <Icon name="eye" size={15} />
            </span>
            The problem
          </h3>
          <p>{project.problem}</p>
        </section>
        <section className="card cs-card">
          <h3>
            <span className="cs-icon cs-blue">
              <Icon name="sparkles" size={15} />
            </span>
            The approach
          </h3>
          <p>{project.approach}</p>
        </section>
      </div>

      <section className="card cs-card">
        <h3>
          <span className="cs-icon cs-green">
            <Icon name="checkmark" size={15} strokeWidth={2.2} />
          </span>
          What I built
        </h3>
        <ul className="check-list">
          {project.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <div className="decision-grid">
        {project.decisions.map((d) => (
          <section key={d.title} className="card decision-card">
            <h4>{d.title}</h4>
            <p>{d.body}</p>
          </section>
        ))}
      </div>

      <div className="cs-grid">
        <section className="card cs-card">
          <h3>
            <span className="cs-icon cs-gray">
              <Icon name="cpu" size={15} />
            </span>
            Tech stack
          </h3>
          <ul className="chips">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section className="card cs-card">
          <h3>
            <span className="cs-icon cs-orange">
              <Icon name="arrowUpRight" size={15} strokeWidth={2} />
            </span>
            What&rsquo;s next
          </h3>
          {project.status && <p className="status-note">{project.status}</p>}
          <ul className="check-list check-list-next">
            {project.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Diagrams */}
      <SectionHeader id="architecture" title="Architecture" sub="How the pieces connect, from the browser to the data." />
      <section className="card">
        <ArchitectureDiagram project={project} />
      </section>

      <SectionHeader id="user-flow" title="User flow" sub="What a user does, step by step, and where the AI steps in." />
      <section className="card">
        <UserFlowDiagram project={project} />
      </section>

      {/* Prev / next */}
      <nav className="pager" aria-label="More case studies">
        <Link href={`/projects/${prev.slug}`} className="card pager-link">
          <Icon name="chevronLeft" size={16} strokeWidth={2} />
          <Image src={`/projects/${prev.slug}/icon.svg`} alt="" width={32} height={32} />
          <span>
            <small>Previous</small>
            {prev.name}
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="card pager-link pager-next">
          <span>
            <small>Next</small>
            {next.name}
          </span>
          <Image src={`/projects/${next.slug}/icon.svg`} alt="" width={32} height={32} />
          <Icon name="chevronRight" size={16} strokeWidth={2} />
        </Link>
      </nav>
    </div>
  );
}
