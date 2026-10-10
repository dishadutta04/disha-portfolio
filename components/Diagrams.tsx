import type { Project } from "@/lib/data";
import { Icon } from "./Symbols";

// Architecture: tiers left to right (top to bottom on phones), arrows between tiers.
export function ArchitectureDiagram({ project }: { project: Project }) {
  const { tiers, note } = project.architecture;
  return (
    <figure className="diagram" style={{ "--accent": project.accent } as React.CSSProperties}>
      <div className="arch" style={{ "--tiers": tiers.length } as React.CSSProperties}>
        {tiers.map((tier, i) => (
          <div key={tier.title} className="arch-tier-wrap">
            <section className="arch-tier" aria-label={tier.title}>
              <h4>
                <span>{i + 1}</span>
                {tier.title}
              </h4>
              <ul>
                {tier.nodes.map((n) => (
                  <li key={n.label} className="arch-node">
                    <span className="arch-icon">
                      <Icon name={n.icon} size={16} />
                    </span>
                    <div>
                      <strong>{n.label}</strong>
                      <small>{n.detail}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            {i < tiers.length - 1 && (
              <span className="arch-arrow" aria-hidden="true">
                <Icon name="arrowRight" size={16} strokeWidth={2} />
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption>
        <Icon name="sparkles" size={13} /> {note}
      </figcaption>
    </figure>
  );
}

const kindLabel = { start: "Start", decision: "Decision", ai: "AI step", end: "Done", step: "" } as const;

// User flow: phases as swim columns, steps top to bottom, decisions show their "no" branch.
export function UserFlowDiagram({ project }: { project: Project }) {
  const { phases, note } = project.flow;
  let n = 0;
  return (
    <figure className="diagram" style={{ "--accent": project.accent } as React.CSSProperties}>
      <div className="flow" style={{ "--phases": phases.length } as React.CSSProperties}>
        {phases.map((phase) => (
          <section key={phase.title} className="flow-phase" aria-label={phase.title}>
            <h4>{phase.title}</h4>
            <ol>
              {phase.steps.map((s) => {
                n += 1;
                const kind = s.kind ?? "step";
                return (
                  <li key={s.label} className={`flow-step flow-${kind}`}>
                    <span className="flow-num">{kind === "decision" ? "?" : n}</span>
                    <div>
                      <div className="flow-top">
                        <strong>{s.label}</strong>
                        {s.actor && <em className="flow-actor">{s.actor}</em>}
                      </div>
                      {s.detail && <small>{s.detail}</small>}
                      {kindLabel[kind] && <span className="flow-kind">{kindLabel[kind]}</span>}
                      {s.branch && (
                        <p className="flow-branch">
                          <Icon name="branch" size={12} /> {s.branch}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
      <figcaption>
        <Icon name="flow" size={13} /> {note}
      </figcaption>
      <ul className="flow-legend" aria-label="Legend">
        <li>
          <i className="lg-start" /> Start / done
        </li>
        <li>
          <i className="lg-ai" /> AI step
        </li>
        <li>
          <i className="lg-decision" /> Decision
        </li>
        <li>
          <i className="lg-step" /> User / system step
        </li>
      </ul>
    </figure>
  );
}
