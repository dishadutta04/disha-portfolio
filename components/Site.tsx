import Link from "next/link";
import { profile } from "@/lib/data";
import { GitHubMark, Icon, LinkedInMark } from "./Symbols";

// ---------- header ----------

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "My work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo">
          {profile.name}
        </Link>
        <nav className="site-nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={profile.resume} className="btn btn-primary site-resume">
          <Icon name="download" size={14} strokeWidth={2} /> Résumé
        </a>
      </div>
    </header>
  );
}

// ---------- footer ----------

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p className="site-footer-name">{profile.name}</p>
        <div className="socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubMark size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInMark size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Icon name="envelope" size={19} />
          </a>
        </div>
        <p className="site-footer-copy">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js
        </p>
      </div>
    </footer>
  );
}

// ---------- page building blocks ----------

export function Section({ id, tone, children }: { id?: string; tone?: "alt" | "dark"; children: React.ReactNode }) {
  return (
    <section id={id} className={`section ${tone ? `section-${tone}` : ""}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeader({ id, kicker, title, sub, children }: { id?: string; kicker?: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <header className="section-header" id={id}>
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      {children}
    </header>
  );
}
