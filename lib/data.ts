// Every fact here comes from Disha_Dutta_Resume.pdf, the project READMEs and the
// project diagrams in ~/Desktop/DD. Edit this file to update the portfolio.

import type { SymbolName } from "@/components/Symbols";

export const profile = {
  name: "Disha Dutta",
  firstName: "Disha",
  role: "AI / Machine Learning Engineer",
  tagline: "I build agentic LLM systems end to end: multi-agent workflows, hybrid retrieval and FastAPI services.",
  availability: "Open to relocation across India · open to remote",
  email: "dishadutta61@gmail.com",
  github: "https://github.com/dishadutta04",
  githubHandle: "dishadutta04",
  linkedin: "https://www.linkedin.com/in/disha-dutta-748579275/",
  resume: "/Disha_Dutta_Resume.pdf",
};

export const about = [
  "Information Technology graduate who builds agentic LLM systems end to end: multi-agent workflows in LangGraph, hybrid retrieval pipelines, and FastAPI services with real databases, event queues and Docker behind them.",
  "Recent builds include a voice-first multi-agent shopping assistant and an explainable fraud and credit-risk engine for BFSI.",
];

export const principles: { title: string; body: string; icon: SymbolName }[] = [
  { title: "People approve, agents propose", body: "Mitra AI pauses for a human yes before any purchase commits.", icon: "hand" },
  { title: "Every decision explains itself", body: "Fraud and credit scores ship with their reasons and contributing factors.", icon: "doc" },
  { title: "Rules first, LLM for the gaps", body: "Rule-based checks take the clear cases; the LLM handles the fuzzy ones.", icon: "branch" },
  { title: "Safe to retry", body: "Idempotency keys, audit logs and ordered writes, so nothing happens twice.", icon: "shield" },
];

// ---------- projects ----------

export type Shot = { src: string; caption: string };

export type ArchTier = {
  title: string;
  nodes: { label: string; detail: string; icon: SymbolName }[];
};

export type FlowStep = {
  label: string;
  detail?: string;
  kind?: "start" | "step" | "decision" | "ai" | "end";
  actor?: string;
  branch?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  repo: string;
  repoName: string;
  language: string;
  languageColor: string;
  accent: string;
  stack: string[];
  stats: { value: string; label: string }[];
  problem: string;
  approach: string;
  built: string[];
  decisions: { title: string; body: string }[];
  status?: string;
  next: string[];
  shots: Shot[];
  video?: string;
  architecture: { tiers: ArchTier[]; note: string };
  flow: { phases: { title: string; steps: FlowStep[] }[]; note: string };
};

export const projects: Project[] = [
  {
    slug: "mitra-ai",
    name: "Mitra AI",
    tagline: "A voice-first multi-agent shopping assistant for elderly users in India.",
    category: "Agentic AI · Voice",
    year: "2026",
    repo: "https://github.com/dishadutta04/MitraAI",
    repoName: "MitraAI",
    language: "TypeScript · Python",
    languageColor: "#3178c6",
    accent: "#e8326b",
    stack: ["Python", "LangGraph", "FastAPI", "Next.js", "Tailwind CSS", "PostgreSQL (Supabase)", "Redis", "Clerk", "WebSockets", "Docker"],
    stats: [
      { value: "8", label: "LangGraph agents" },
      { value: "3", label: "Languages: Hindi, Hinglish, English" },
      { value: "1", label: "Human approval before every order" },
    ],
    problem:
      "Elderly users in India speak in loose Hindi, Hinglish or English (\"2 kilo cheeni jaldi mangao\"), but shopping apps expect them to search, compare and tap through forms. A wrong order can also clash with their diet or medicines.",
    approach:
      "Mitra turns a spoken request into a structured purchase flow. Eight LangGraph agents each own one job, a health guardrail checks the order against the user's own profile, and the graph pauses for a human yes before anything is bought.",
    built: [
      "Eight LangGraph agents: intent, health guardrail, planning, search, comparison, decision, purchase and notification.",
      "Voice and text input with the Web Speech API (hi-IN) and a server speech fallback; a \"Mitra understood\" card lets the user fix quantities before sending.",
      "Health guardrails from each user's profile: conditions (diabetes, blood pressure, kidney), medicines, allergies, plus protection against accidental bulk orders.",
      "Human-in-the-loop pause with LangGraph interrupt(): the user picks options, payment and address, then approves or cancels.",
      "Per-agent progress streamed to the UI over WebSockets, with Redis pub/sub event brokering.",
      "Orders written behind an idempotency key, with a full PostgreSQL audit log; order history with one-tap \"Order again\".",
      "Clerk sign-in and a five-step onboarding: language, details, health, family contacts and voice.",
    ],
    decisions: [
      { title: "One agent, one job", body: "Splitting intent, safety, search and purchase into separate graph nodes keeps each prompt small and each step easy to test and replay." },
      { title: "Pause, don't guess", body: "interrupt() stops the graph before purchase. The order resumes only after an explicit yes from the user." },
      { title: "Idempotent orders", body: "A SHA-256 key per order means a retry or double tap can never place the same order twice." },
      { title: "Works without an API key", body: "If no LLM key is set, intent falls back to rules that understand Hinglish words like jaldi (quickly) and abhi (now)." },
    ],
    status: "Store search uses a demo catalogue (Zepto and Amazon offers are simulated) while real store integrations are explored.",
    next: [
      "Real catalogue through ONDC, India's open commerce network.",
      "Indic speech-to-text and text-to-speech through Bhashini or Sarvam AI.",
      "Family alerts on WhatsApp, and caregiver approval for high-risk orders.",
    ],
    shots: [
      { src: "/projects/mitra-ai/voice-input.jpg", caption: "Speak or type the order. Each Hindi word is tagged as item, number, unit or urgency." },
      { src: "/projects/mitra-ai/approval.jpg", caption: "Purchase approval: best match pre-selected per item, nothing bought until the user confirms." },
      { src: "/projects/mitra-ai/agent-console.jpg", caption: "Agent console: the live event stream from all eight agents over WebSockets." },
      { src: "/projects/mitra-ai/health-guardrail.jpg", caption: "Health guardrail flags sugar for a diabetic profile and suggests healthier options." },
      { src: "/projects/mitra-ai/order-history.jpg", caption: "Order history with one-tap \"Order again\"." },
    ],
    architecture: {
      tiers: [
        {
          title: "Client",
          nodes: [
            { label: "Next.js app", detail: "App Router, Tailwind, Mac-style UI", icon: "window" },
            { label: "Voice input", detail: "Web Speech API (hi-IN) + server fallback", icon: "mic" },
            { label: "Clerk", detail: "Sign-in, session token", icon: "lock" },
          ],
        },
        {
          title: "API",
          nodes: [
            { label: "FastAPI", detail: "/orders, /profile, /voice", icon: "server" },
            { label: "WebSocket", detail: "/ws/events: live agent timeline", icon: "bolt" },
            { label: "Auth check", detail: "Clerk JWT verified via JWKS", icon: "shield" },
          ],
        },
        {
          title: "LangGraph agents",
          nodes: [
            { label: "Intent → Guardrail → Planning", detail: "LLM structured output, rule fallback", icon: "brain" },
            { label: "Search → Compare → Decision", detail: "Weighted price vs delivery time", icon: "search" },
            { label: "Purchase ⏸ → Notify", detail: "interrupt() for approval, retries", icon: "cart" },
          ],
        },
        {
          title: "Data & services",
          nodes: [
            { label: "PostgreSQL", detail: "Profiles, orders, audit log (Supabase)", icon: "database" },
            { label: "Redis", detail: "Pub/sub event brokering", icon: "layers" },
            { label: "Stores & alerts", detail: "Zepto / Amazon search, SMS & email", icon: "bell" },
          ],
        },
      ],
      note: "The browser never talks to stores or the LLM directly: every step runs inside the LangGraph workflow on the server and is written to the audit log.",
    },
    flow: {
      phases: [
        {
          title: "Open & sign in",
          steps: [
            { label: "Open Mitra AI", kind: "start" },
            { label: "Splash screen", detail: "Pixel-M logo animation" },
            { label: "Sign in or sign up", detail: "Email or Google (Clerk)" },
            { label: "First time?", kind: "decision", branch: "No → go straight to the assistant" },
          ],
        },
        {
          title: "Profile setup",
          steps: [
            { label: "Language", detail: "Hinglish, Hindi or English" },
            { label: "Your details", detail: "Name, age, address, stores, payment" },
            { label: "Health", detail: "Conditions, medicines, allergies" },
            { label: "Family & voice", detail: "Contacts, alerts, mic test" },
          ],
        },
        {
          title: "Ordering",
          steps: [
            { label: "Speak or type the order", detail: "\"2 kilo cheeni jaldi mangao\"" },
            { label: "Mitra understood", detail: "Check items, fix quantities", kind: "ai" },
            { label: "Health check", detail: "Against this user's profile", kind: "ai" },
            { label: "Risky for you?", kind: "decision", branch: "Yes → warning + healthier options" },
            { label: "Search & compare", detail: "Price, delivery time, stock", kind: "ai" },
          ],
        },
        {
          title: "Checkout & after",
          steps: [
            { label: "Confirmation screen", detail: "Options, payment, address" },
            { label: "Approve?", kind: "decision", branch: "No → order cancelled, nothing bought" },
            { label: "Place the order", detail: "Idempotent, retried on failure" },
            { label: "Alerts to user & family", detail: "SMS + email" },
            { label: "Order history → Order again", kind: "end" },
          ],
        },
      ],
      note: "Nothing is bought without the user's OK, and health warnings come from the user's own profile.",
    },
  },
  {
    slug: "hireflow",
    name: "HireFlow AI",
    tagline: "An AI-enabled HR platform for hiring, leave, reviews and payroll.",
    category: "Full stack · Gemini",
    year: "2026",
    repo: "https://github.com/dishadutta04/HirePro",
    repoName: "HirePro",
    language: "TypeScript · Python",
    languageColor: "#3178c6",
    accent: "#8b5cf6",
    stack: ["FastAPI", "Next.js 14", "TypeScript", "SQLAlchemy", "Supabase (Auth, Postgres, Storage)", "Gemini API", "Tailwind CSS", "Docker"],
    stats: [
      { value: "8", label: "HR modules" },
      { value: "3", label: "Roles: admin, manager, employee" },
      { value: "8", label: "Gemini-powered features" },
    ],
    problem:
      "Small and mid-size teams run hiring, leave, attendance, reviews and payroll across spreadsheets and separate tools, with no single place for HR data and no help with the paperwork.",
    approach:
      "One HR workspace where everyone signs in, sees only what their role allows, and Gemini handles the writing: resume scores, interview questions, policy answers and review summaries.",
    built: [
      "Employee directory with search, profiles, photos and document uploads.",
      "Recruitment: job postings and a drag-and-drop candidate pipeline (kanban) with side-by-side comparison.",
      "Leave requests, balances and approvals; daily attendance with a monthly calendar.",
      "Performance review cycles with self and manager reviews; onboarding checklists with progress.",
      "Payroll records (draft → processed → paid) and payslips.",
      "Supabase sign-in, invite-only accounts, and role-based pages and API access.",
      "Gemini: resume scoring, interview questions, candidate comparison, leave-pattern analysis, review summaries, HR summary and a policy chatbot, with graceful fallback when no API key is set.",
    ],
    decisions: [
      { title: "Roles live on the server", body: "FastAPI verifies the Supabase token and looks the user up in its own users table, so only people an admin added can get in." },
      { title: "Invite-only accounts", body: "There is no public sign-up. Admins invite people; the invite email lets them set a password." },
      { title: "AI behind the API", body: "The browser never calls Gemini or the database directly; business logic and AI stay in FastAPI." },
      { title: "Private file storage", body: "Uploads go to a private Supabase Storage bucket and are served through short-lived signed links." },
    ],
    next: [
      "Indian payroll compliance: PF, ESI, professional tax and TDS.",
      "Policy chatbot with document search and citations.",
      "Leave and policy questions from WhatsApp and Slack.",
    ],
    shots: [
      { src: "/projects/hireflow/dashboard.jpg", caption: "Admin dashboard: headcount, approvals waiting, team by department and quick HR questions." },
      { src: "/projects/hireflow/recruitment.jpg", caption: "Recruitment: open jobs with candidate counts." },
      { src: "/projects/hireflow/employees.jpg", caption: "Employee directory with search and department filters." },
      { src: "/projects/hireflow/leave.jpg", caption: "Leave: balances by type and a request form." },
      { src: "/projects/hireflow/payslip.jpg", caption: "Payslips: employees only see their own." },
      { src: "/projects/hireflow/users-roles.jpg", caption: "Users & roles: invites and role changes, admin only." },
      { src: "/projects/hireflow/sign-in.jpg", caption: "Invite-only sign-in." },
      { src: "/projects/hireflow/dark-mode.jpg", caption: "Light and dark mode." },
    ],
    video: "/projects/hireflow/demo.mp4",
    architecture: {
      tiers: [
        {
          title: "Browser",
          nodes: [
            { label: "Admin · Manager · Employee", detail: "One app, role-aware pages", icon: "people" },
            { label: "Next.js 14 (Vercel)", detail: "App Router, shadcn/ui, Recharts, dnd-kit", icon: "window" },
            { label: "middleware.ts", detail: "No session → /login, wrong role → /dashboard", icon: "lock" },
          ],
        },
        {
          title: "Auth",
          nodes: [
            { label: "Supabase Auth", detail: "Email + password, issues the JWT", icon: "lock" },
            { label: "Invite emails", detail: "Admin invites; user sets a password", icon: "envelope" },
          ],
        },
        {
          title: "API (FastAPI)",
          nodes: [
            { label: "Auth dependency", detail: "Verify JWT (JWKS), require_role()", icon: "shield" },
            { label: "Routers", detail: "Employees, recruitment, leave, attendance, performance, onboarding, payroll, chat", icon: "server" },
            { label: "SQLAlchemy", detail: "Models and queries", icon: "layers" },
          ],
        },
        {
          title: "Data & AI",
          nodes: [
            { label: "Supabase Postgres", detail: "All HR tables (SQLite in dev)", icon: "database" },
            { label: "Supabase Storage", detail: "Resumes, documents, avatars; signed links", icon: "folder" },
            { label: "Google Gemini", detail: "Scores, questions, summaries, chatbot", icon: "sparkles" },
          ],
        },
      ],
      note: "Every API call carries the Supabase token as a Bearer header; FastAPI checks it and the role before touching data.",
    },
    flow: {
      phases: [
        {
          title: "1 · The hire",
          steps: [
            { label: "Admin posts a job", detail: "JD + skills", actor: "Admin", kind: "start" },
            { label: "Candidate applies", detail: "Uploads a resume", actor: "Candidate" },
            { label: "Resume scored vs JD", detail: "0–100, strengths, gaps", kind: "ai" },
            { label: "Manager reviews the pipeline", detail: "Kanban, interview questions", actor: "Manager" },
            { label: "Hire?", kind: "decision", branch: "No → kept in the talent pool" },
          ],
        },
        {
          title: "2 · Day one",
          steps: [
            { label: "Offer letter + profile", detail: "Invite email sent", kind: "ai" },
            { label: "Sets password, signs in", actor: "Employee" },
            { label: "Onboarding checklist", detail: "Uploads ID and bank documents" },
            { label: "Asks the HR bot", detail: "\"How many casual leaves do I get?\"", kind: "ai" },
          ],
        },
        {
          title: "3 · Everyday work",
          steps: [
            { label: "Marks attendance", actor: "Employee" },
            { label: "Applies for leave", actor: "Employee" },
            { label: "Team capacity check", detail: "For those dates", kind: "ai" },
            { label: "Approve leave?", kind: "decision", actor: "Manager", branch: "No → sees the reason, can re-apply" },
          ],
        },
        {
          title: "4 · Growth & pay",
          steps: [
            { label: "Review cycle opens", detail: "Self + manager review" },
            { label: "Review summary", kind: "ai" },
            { label: "Payroll run → payslip", actor: "Admin" },
            { label: "Monthly HR summary", detail: "For leadership", kind: "ai", actor: "Admin" },
            { label: "Hired, onboarded, reviewed, paid", kind: "end" },
          ],
        },
      ],
      note: "AI moments: resume scoring → interview questions → comparison → offer letter → policy bot → team capacity → review summary → HR summary.",
    },
  },
  {
    slug: "fraud-credit-ai",
    name: "Fraud & Credit AI",
    tagline: "An explainable fraud and credit-risk engine for banks and lenders.",
    category: "Agentic AI · BFSI",
    year: "Nov 2025",
    repo: "https://github.com/dishadutta04/fraud-detection-credit-risk-ai",
    repoName: "fraud-detection-credit-risk-ai",
    language: "Python",
    languageColor: "#3572a5",
    accent: "#2563eb",
    stack: ["Python", "FastAPI", "OpenAI API", "Streamlit", "MySQL", "SQLAlchemy", "Docker Compose"],
    stats: [
      { value: "0–1000", label: "Credit risk score" },
      { value: "0–100%", label: "Fraud probability" },
      { value: "3", label: "Agents: orchestrator, credit, fraud" },
    ],
    problem:
      "A bank asks two questions all day: \"Should we give this loan?\" and \"Is this payment a fraud?\" Both need a fast answer and a reason a reviewer can audit.",
    approach:
      "An orchestrator routes each request to a specialist agent. Each agent pairs rule-based checks with LLM reasoning for the fuzzy cases, and every decision is stored with its reasoning and contributing factors.",
    built: [
      "Credit agent: scores applications on traditional data (credit score, income) and alternative data (utility and rent history), returning a 0–1000 risk score.",
      "Score routing: above 750 auto-approve, 300–750 manual review, below 300 auto-reject.",
      "Fraud agent: scores transactions on amount pattern, device fingerprint, location change, velocity abuse and merchant category.",
      "Action routing: under 60% allow, 60–90% ask to verify, over 90% block.",
      "Orchestrator: sequences database writes so a fraud case can never commit before its parent transaction.",
      "Streamlit dashboard with Fraud Monitoring, Credit Applications and Agent Learning pages.",
      "Feedback loop: real outcomes (repaid? fraud confirmed?) logged to track how often the agents were right.",
    ],
    decisions: [
      { title: "Explainability first", body: "Every score is saved with its reasoning and factors as JSON, so a reviewer sees why, not just what." },
      { title: "Hybrid logic", body: "Rules give fast, predictable answers; the LLM is called for patterns rules can't express." },
      { title: "Ordered writes", body: "Transactions commit first and fraud cases after, keeping foreign keys intact." },
      { title: "Pluggable agents", body: "New agents (compliance, portfolio) plug into the same orchestrator pattern." },
    ],
    next: [
      "A trained model as the main credit scorer, with the LLM writing the explanation.",
      "Fairness and drift checks on the feedback data.",
    ],
    shots: [],
    architecture: {
      tiers: [
        {
          title: "Inputs",
          nodes: [
            { label: "Loan request", detail: "Income, job, credit score, rent & bills", icon: "doc" },
            { label: "Card payment", detail: "Amount, merchant, location, device", icon: "creditcard" },
          ],
        },
        {
          title: "API (FastAPI)",
          nodes: [
            { label: "/credit/assess", detail: "Credit applications", icon: "server" },
            { label: "/fraud/check", detail: "Real-time transactions", icon: "server" },
            { label: "/feedback", detail: "Real outcomes + stats", icon: "chart" },
          ],
        },
        {
          title: "Agents",
          nodes: [
            { label: "Orchestrator", detail: "Routes the request, orders the writes", icon: "branch" },
            { label: "Credit agent", detail: "Rules + LLM → 0–1000 score + reasons", icon: "brain" },
            { label: "Fraud agent", detail: "Rules + LLM → 0–100% + anomalies", icon: "eye" },
          ],
        },
        {
          title: "Data & UI",
          nodes: [
            { label: "MySQL", detail: "Transactions, fraud cases, applications, learning logs", icon: "database" },
            { label: "OpenAI API", detail: "Reasoning for fuzzy cases", icon: "sparkles" },
            { label: "Streamlit dashboard", detail: "Cases, decisions and reasons", icon: "chart" },
          ],
        },
      ],
      note: "Each request is stateless; all state lives in MySQL, with explainability JSON next to every decision.",
    },
    flow: {
      phases: [
        {
          title: "Request comes in",
          steps: [
            { label: "Loan request or card payment", kind: "start" },
            { label: "Orchestrator picks the expert", detail: "\"Which agent should look at this?\"", kind: "ai" },
          ],
        },
        {
          title: "Loan path",
          steps: [
            { label: "Credit agent scores it", detail: "0–1000 + the reasons why", kind: "ai" },
            { label: "Score?", kind: "decision", branch: "> 750 approve · 300–750 human check · < 300 reject" },
          ],
        },
        {
          title: "Payment path",
          steps: [
            { label: "Fraud agent scores it", detail: "0–100% + what looked odd", kind: "ai" },
            { label: "Fraud chance?", kind: "decision", branch: "< 60% allow · 60–90% verify · > 90% block" },
          ],
        },
        {
          title: "Review & learn",
          steps: [
            { label: "Dashboard", detail: "Staff see cases, decisions and reasons", actor: "Bank staff" },
            { label: "Feedback", detail: "Was the loan repaid? Was the fraud real?" },
            { label: "Accuracy report", detail: "How often the agents were right", kind: "end" },
          ],
        },
      ],
      note: "Human review sits in the middle band of both paths, where the agents are least certain.",
    },
  },
  {
    slug: "multi-agent-rag",
    name: "Multi-Agent RAG",
    tagline: "Hybrid BM25 + vector retrieval with an agent that re-ranks before generation.",
    category: "Retrieval · LangGraph",
    year: "Dec 2025",
    repo: "https://github.com/dishadutta04/Multi-Agent-RAG-System-using-LangGraph",
    repoName: "Multi-Agent-RAG-System-using-LangGraph",
    language: "Python",
    languageColor: "#3572a5",
    accent: "#059669",
    stack: ["Python", "LangGraph", "LangChain", "BM25", "Vector search"],
    stats: [
      { value: "2", label: "Retrievers: BM25 + vector" },
      { value: "3", label: "Graph nodes" },
      { value: "1", label: "Ranking agent" },
    ],
    problem:
      "Vector search misses exact terms like IDs and names; keyword search misses meaning. Either way, noisy context reaches the LLM and answers drift.",
    approach:
      "Combine both retrievers, then let a ranking agent re-order the chunks before generation, with retrieval, ranking and generation as separate LangGraph nodes.",
    built: [
      "Hybrid retrieval combining BM25 keyword search with vector similarity, so exact-term and semantic matches both surface for a query.",
      "A ranking agent re-ranks retrieved chunks before generation, cutting noisy context reaching the LLM.",
      "Retrieval, ranking and generation as separate LangGraph nodes, each testable on its own.",
    ],
    decisions: [
      { title: "Two retrievers, not one", body: "BM25 catches exact terms; vectors catch paraphrases. Merging both raises recall." },
      { title: "Rank before you generate", body: "A smaller, cleaner context beats a bigger, noisier one." },
      { title: "Nodes, not a chain", body: "Separate graph nodes make it easy to swap a retriever or ranker." },
    ],
    next: ["Answer citations back to the source chunk.", "An evaluation set to compare retrieval settings."],
    shots: [],
    architecture: {
      tiers: [
        {
          title: "Ingest",
          nodes: [
            { label: "Documents", detail: "Split into chunks", icon: "doc" },
            { label: "Indexes", detail: "BM25 index + vector embeddings", icon: "layers" },
          ],
        },
        {
          title: "Retrieve",
          nodes: [
            { label: "BM25 search", detail: "Exact-term matches", icon: "search" },
            { label: "Vector search", detail: "Semantic matches", icon: "cube" },
          ],
        },
        {
          title: "Rank",
          nodes: [{ label: "Ranking agent", detail: "Re-orders and trims the merged chunks", icon: "chart" }],
        },
        {
          title: "Generate",
          nodes: [{ label: "LLM generation node", detail: "Answers from the top chunks", icon: "sparkles" }],
        },
      ],
      note: "Each stage is its own LangGraph node, so retrieval and ranking can be changed without touching generation.",
    },
    flow: {
      phases: [
        { title: "Ask", steps: [{ label: "User asks a question", kind: "start" }] },
        {
          title: "Retrieve",
          steps: [
            { label: "BM25 + vector search", detail: "Run on the same query", kind: "ai" },
            { label: "Merge candidates" },
          ],
        },
        { title: "Rank", steps: [{ label: "Ranking agent re-orders", detail: "Drops noisy chunks", kind: "ai" }] },
        { title: "Answer", steps: [{ label: "LLM writes the answer", detail: "From the top chunks", kind: "end" }] },
      ],
      note: "Less noise in, better answers out.",
    },
  },
];

export const moreProjects = [
  { name: "ai-smart-resume-analyser", title: "AI Resume Analyser", body: "ATS scoring plus an AI rewrite of the résumé, built in Streamlit.", href: "https://github.com/dishadutta04/ai-smart-resume-analyser", language: "Python", color: "#3572a5" },
  { name: "ai-portfolio-builder", title: "AI Portfolio Builder", body: "Generates a portfolio site from a person's details.", href: "https://github.com/dishadutta04/ai-portfolio-builder", language: "AI", color: "#e8326b" },
  { name: "scamify-phishing-detector", title: "Scamify", body: "A phishing detector that flags suspicious messages and links.", href: "https://github.com/dishadutta04/scamify-phishing-detector", language: "Security", color: "#059669" },
];

export const experience = [
  {
    role: "AI/ML Intern",
    org: "Icehut Technologies",
    dates: "Jan 2026 – Jun 2026",
    icon: "cpu" as SymbolName,
    points: [
      "Built a real-time distracted-driver detection pipeline in Python: OpenCV for frame capture and face/ROI extraction, feeding a TensorFlow CNN that classifies driver activity.",
      "Owned the training loop: cleaning, augmentation, class balancing and hyperparameter tuning, evaluated on held-out drivers.",
      "Tracked per-class precision and recall rather than overall accuracy; also prototyped LLM-assisted internal tooling (prompt design, structured output parsing).",
    ],
  },
  {
    role: "Web Development Intern",
    org: "Defence Research and Development Organisation (DRDO)",
    dates: "May 2025 – Jul 2025",
    icon: "globe" as SymbolName,
    points: [
      "Built a responsive internal web application (HTML, CSS, JavaScript, PHP, Bootstrap) on a MySQL/XAMPP stack.",
      "Cut page load time by roughly 30% by compressing assets, deferring render-blocking scripts and removing redundant queries; verified across 5+ screen sizes.",
    ],
  },
];

export const education = [
  { title: "B.Tech, Information Technology", place: "Banasthali Vidyapith, Niwai, Rajasthan", dates: "2022 – 2026" },
  { title: "Senior Secondary (Class XII)", place: "LK Singhania Education Centre, Gotan, Rajasthan", dates: "2022" },
];

export const skills: { group: string; icon: SymbolName; items: string[] }[] = [
  { group: "AI & Agents", icon: "brain", items: ["LangGraph", "LangChain", "Multi-agent orchestration", "RAG", "BM25 + vector", "Human-in-the-loop", "Prompt engineering", "Explainable AI", "OpenAI API", "Gemini API", "NLP"] },
  { group: "Machine Learning", icon: "cpu", items: ["scikit-learn", "TensorFlow", "OpenCV", "CNNs", "Classification", "Anomaly detection", "Feature engineering", "Model evaluation"] },
  { group: "Backend & Frontend", icon: "server", items: ["FastAPI", "REST APIs", "WebSockets", "SQLAlchemy", "JWT auth", "Streamlit", "Next.js", "Tailwind CSS"] },
  { group: "Data & Infra", icon: "database", items: ["PostgreSQL", "MySQL", "Redis", "Docker", "Docker Compose", "Git", "GitHub"] },
  { group: "Languages & CS", icon: "terminal", items: ["Python", "SQL", "C++", "TypeScript", "JavaScript", "DSA", "OOP", "DBMS", "Operating Systems"] },
];

export const hiring = {
  roles: ["AI / ML engineer", "Applied AI / LLM engineer", "Backend (Python) engineer"],
  type: "Full-time",
  level: "Entry level · B.Tech IT, 2026",
  location: "Anywhere in India (open to relocation) or remote",
};
