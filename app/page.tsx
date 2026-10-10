import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Section, SectionHeader } from "@/components/Site";
import { SkillIcon } from "@/components/SkillIcon";
import { GitHubMark, Icon, LinkedInMark } from "@/components/Symbols";
import { about, education, experience, hiring, moreProjects, principles, profile, projects, skills } from "@/lib/data";

// Each letter of the hero word is set on its own so it can tilt and drop independently.
const heroLetters = "DISHA DUTTA".split("");

// Pastel folder tiles beside the hero portrait, one per case study.
const folderColors = ["#f7a8c4", "#ff9f5a", "#8fbcff", "#c6ec6a"];

function Folder({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 50" width="64" height="50" aria-hidden="true">
      <path d="M4 6a4 4 0 0 1 4-4h16l6 6h26a4 4 0 0 1 4 4v4H4Z" fill={color} style={{ filter: "brightness(0.9)" }} />
      <rect x="2" y="12" width="60" height="36" rx="5" fill={color} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero: the name in scattered letters, with the cutout portrait standing in front of them. */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="container hero-stage">
          <h1 id="hero-title" className="hero-word" aria-label={profile.name}>
            {heroLetters.map((l, i) => (
              <span key={i} className={`hl hl-${i + 1}`} aria-hidden="true">
                {l}
              </span>
            ))}
          </h1>

          <div className="hero-photo">
            <Image src="/disha.png" alt={`Portrait of ${profile.name}`} width={1087} height={1446} priority sizes="(max-width: 640px) 78vw, 400px" />
          </div>

          <div className="hero-left">
            <p className="hero-tag">Hi, I&rsquo;m {profile.firstName}</p>
            <p className="hero-lede">{profile.tagline}</p>
            <a href="#contact" className="connect">
              Let&rsquo;s connect
            </a>
            <div className="socials hero-socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubMark size={24} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInMark size={22} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Icon name="envelope" size={25} />
              </a>
              <a href={profile.resume} aria-label="Résumé">
                <Icon name="doc" size={24} />
              </a>
            </div>
          </div>

          <div className="hero-right">
            <p className="hero-role">
              AI / ML Engineer
              <Icon name="hand" size={24} className="hero-cursor" />
            </p>
            <div className="hero-folders">
              {projects.map((p, i) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="hero-folder">
                  <Folder color={folderColors[i % folderColors.length]} />
                  <span>{p.slug.replace(/-/g, "_")}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <div className="container">
        <ul className="facts">
          <li>
            <strong>{projects.length}</strong>
            <span>Case studies</span>
          </li>
          <li>
            <strong>2</strong>
            <span>Internships: Icehut, DRDO</span>
          </li>
          <li>
            <strong>8</strong>
            <span>Agents in one LangGraph</span>
          </li>
          <li>
            <strong>2026</strong>
            <span>B.Tech IT graduate</span>
          </li>
        </ul>
      </div>

      {/* About */}
      <Section id="about">
        <div className="about">
          <div className="about-photo" aria-hidden="true">
            <Image src="/disha.png" alt="" width={1087} height={1446} sizes="(max-width: 860px) 360px, 420px" />
          </div>
          <div>
            <h2 className="script-title">Hi, I&rsquo;m {profile.firstName}!</h2>
            <p className="about-role">{profile.role}</p>
            {about.map((p) => (
              <p key={p} className="about-p">
                {p}
              </p>
            ))}
            <p className="about-meta">
              <span className="status-dot" /> {profile.availability}
            </p>
          </div>
        </div>

        <SectionHeader title="How I build" sub="Habits that show up in every project." />
        <ul className="principles">
          {principles.map((p) => (
            <li key={p.title}>
              <span className="principle-icon">
                <Icon name={p.icon} size={18} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Projects */}
      <Section id="work" tone="alt">
        <SectionHeader id="projects" kicker="Case studies" title="My work includes" sub="Each project opens a full case study: screens, architecture and user flow." />
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <SectionHeader title="More on GitHub" sub="Smaller builds and experiments." />
        <div className="repo-grid">
          {moreProjects.map((m) => (
            <a key={m.name} href={m.href} target="_blank" rel="noreferrer" className="card repo-card">
              <p className="repo-head">
                <GitHubMark size={14} /> github / {m.name}
              </p>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
              <span className="lang">
                <i style={{ background: m.color }} />
                {m.language}
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <SectionHeader kicker="Where I've worked" title="Experience" />
        <div className="exp-grid">
          {experience.map((e) => (
            <article key={e.org} className="card exp-card">
              <div className="exp-head">
                <span className="exp-icon">
                  <Icon name={e.icon} size={20} />
                </span>
                <div>
                  <h3>{e.role}</h3>
                  <p>{e.org}</p>
                </div>
                <time>{e.dates}</time>
              </div>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <SectionHeader title="Education" />
        <ul className="card list-card">
          {education.map((e) => (
            <li key={e.title}>
              <span className="exp-icon">
                <Icon name="graduation" size={18} />
              </span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.place}</p>
              </div>
              <time>{e.dates}</time>
            </li>
          ))}
        </ul>
      </Section>

      {/* Skills */}
      <Section id="skills" tone="alt">
        <SectionHeader kicker="Toolkit" title="Skills" sub="From the résumé, grouped by where I use them." />
        <div className="skills-grid">
          {skills.map((s) => (
            <section key={s.group} className="card skill-card">
              <h3>
                <Icon name={s.icon} size={15} /> {s.group}
              </h3>
              <ul className="chips">
                {s.items.map((i) => (
                  <li key={i}>
                    <SkillIcon skill={i} />
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      {/* Hiring + contact */}
      <Section id="contact" tone="dark">
        <div className="contact">
          <div>
            <p className="script-title script-light">Let&rsquo;s work</p>
            <h2 className="contact-title">Together</h2>
            <p className="contact-p">The fastest way to reach me is email.</p>
            <a href={`mailto:${profile.email}`} className="connect connect-light">
              {profile.email}
            </a>
            <div className="btn-row">
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <GitHubMark size={14} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <LinkedInMark size={13} /> LinkedIn
              </a>
              <a href={profile.resume} className="btn btn-ghost">
                <Icon name="doc" size={14} /> Résumé
              </a>
            </div>
          </div>
          <div className="hiring">
            <p className="hiring-title">What I&rsquo;m looking for</p>
            <dl>
            <div>
              <dt>Roles</dt>
              <dd>{hiring.roles.join(" · ")}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{hiring.type}</dd>
            </div>
            <div>
              <dt>Level</dt>
              <dd>{hiring.level}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{hiring.location}</dd>
            </div>
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
