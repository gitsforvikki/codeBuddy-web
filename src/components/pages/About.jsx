import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../utils/routes";

export const AboutPage = () => {
  const user = useSelector((state) => state.user.user);

  const stats = [
    { label: "Active Developers", value: "25,000+", icon: "👩‍💻" },
    { label: "Connections Sparked", value: "85,000+", icon: "⚡" },
    { label: "Projects Shipped", value: "4,200+", icon: "🚀" },
    { label: "Countries Represented", value: "120+", icon: "🌐" },
  ];

  const pillars = [
    {
      title: "Curiosity Over Clout",
      description:
        "We believe passion and willingness to learn matter far more than follower counts. Every developer deserves a community that listens.",
      icon: "💡",
      color: "bg-[#fff3f0] text-(--connections-coral) border-[#f1a08f]/60",
    },
    {
      title: "Skill Synergy",
      description:
        "Frontend masters, backend wizards, system architects, and AI explorers meet here to combine diverse talents and build full-stack realities.",
      icon: "🧩",
      color: "bg-[#e6eef7] text-(--connections-blue) border-[#b5cce8]",
    },
    {
      title: "Private & Safe by Design",
      description:
        "No unsolicited spam or recruiter clutter. You choose who you connect with, who can message you, and what information you share.",
      icon: "🔒",
      color: "bg-[#f0f4f1] text-[#2c6e49] border-[#c0dac9]",
    },
    {
      title: "Action-Oriented Momentum",
      description:
        "CodeBuddy isn’t just for idle chat. It’s designed to spark hackathon teams, open-source pull requests, and real startup collaborations.",
      icon: "🎯",
      color: "bg-[#fbf4ea] text-[#9c5a1a] border-[#e8d5be]",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Craft Your Profile",
      description:
        "Showcase your top skills, tech stack, experience level, and the kinds of projects you’re passionate about exploring.",
    },
    {
      number: "02",
      title: "Discover Compatible Peers",
      description:
        "Our feed presents developers with shared interests and complementary capabilities. Send an interested request with one tap.",
    },
    {
      number: "03",
      title: "Chat & Build Together",
      description:
        "Once mutually connected, unlock instant real-time messaging, exchange repositories, and begin pairing on your next big idea.",
    },
  ];

  return (
    <div className="min-h-screen bg-(--connections-cream) text-(--connections-ink)">
      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Ambient atmospheric glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-[#f7ded0]/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-[#dbe8f5]/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--connections-line) bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-(--connections-coral) shadow-xs">
            <span>✦</span> About CodeBuddy
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-(--connections-ink) sm:text-5xl md:text-6xl lg:text-7xl">
            Where developers connect, collaborate, and{" "}
            <span className="text-(--connections-coral)">build what's next</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-(--connections-muted) sm:text-lg md:text-xl">
            Software development shouldn’t be a lonely journey. CodeBuddy was
            built to break through isolation and make finding great engineering
            partners as intuitive and natural as writing clean code.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={user ? ROUTES.HOME : ROUTES.SIGNUP}
              className="btn h-13 rounded-xl border-0 bg-(--connections-coral) px-8 text-base font-bold text-white shadow-[0_12px_24px_rgba(184,68,50,0.22)] hover:bg-[#9f3829]"
            >
              {user ? "Explore Feed" : "Join CodeBuddy Free"}
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="btn btn-outline h-13 rounded-xl border-(--connections-line) bg-white px-8 text-base font-bold text-(--connections-ink) hover:border-(--connections-ink) hover:bg-(--connections-ink) hover:text-white"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-(--connections-line) bg-white/90 p-6 shadow-sm backdrop-blur sm:grid-cols-4 sm:p-8">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <span className="text-2xl">{item.icon}</span>
                <p className="mt-2 text-2xl font-black text-(--connections-ink) sm:text-3xl lg:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-(--connections-muted)">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. The Story Behind the Platform ── */}
      <section className="border-y border-(--connections-line) bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-(--connections-coral)">
              Our Story
            </p>
            <h2 className="text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl md:text-5xl">
              From solo debugging to high-velocity co-creation.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-(--connections-muted)">
              <p>
                Every developer has experienced that moment: having a compelling
                side-project concept or encountering a challenging technical hurdle,
                wishing they had an experienced partner to bounce ideas off or
                complement their stack.
              </p>
              <p>
                Traditional social networks are full of algorithmic noise, and job
                boards are transactional. CodeBuddy exists in the sweet spot in
                between—a dedicated space where developers connect on the basis
                of <strong>genuine technical curiosity and collaborative momentum</strong>.
              </p>
              <p>
                Whether you’re crafting an open-source library, training an ML model,
                or exploring modern full-stack web architectures, you’ll find peers
                who share your curiosity and pace.
              </p>
            </div>
          </div>

          {/* Interactive Code / Circle Preview Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-(--connections-ink) p-6 text-white shadow-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-(--connections-coral) flex items-center justify-center font-bold text-white shadow-xs">
                  CB
                </div>
                <div>
                  <p className="text-sm font-bold">CodeBuddy Match Engine</p>
                  <p className="text-xs text-slate-400">Match score: 98% compatible</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                Connected
              </span>
            </div>

            <div className="mt-6 rounded-2xl bg-[#0f1624] p-4 font-mono text-xs text-slate-300">
              <p className="text-slate-400">// Mutually shared developer stack</p>
              <p className="mt-2 text-emerald-300">const collaboration = &#123;</p>
              <p className="ml-4 text-sky-300">frontend: ["React", "TailwindCSS", "Next.js"],</p>
              <p className="ml-4 text-amber-300">backend: ["Node.js", "Express", "MongoDB"],</p>
              <p className="ml-4 text-purple-300">passion: "Open Source Tools & DevEx",</p>
              <p className="ml-4 text-pink-300">status: "Ready to pair program"</p>
              <p className="text-emerald-300">&#125;;</p>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-xs font-bold">Instant Real-Time Chat</p>
                <p className="text-[11px] text-slate-300">
                  Direct message your connections without sharing personal phone numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Four Core Pillars ── */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-(--connections-coral)">
              Guiding Principles
            </p>
            <h2 className="text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl md:text-5xl">
              What sets CodeBuddy apart.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-(--connections-muted)">
              We designed our platform with developer culture in mind from day one.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group flex flex-col justify-between rounded-3xl border border-(--connections-line) bg-white p-7 shadow-xs transition-all hover:-translate-y-1 hover:border-(--connections-coral) hover:shadow-md"
              >
                <div>
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl ${pillar.color}`}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-black tracking-tight text-(--connections-ink)">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-(--connections-muted)">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ── */}
      <section className="border-t border-(--connections-line) bg-[#f4f7f5] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-(--connections-coral)">
              Simple Process
            </p>
            <h2 className="text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl">
              How CodeBuddy Works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-(--connections-muted) sm:text-base">
              Start finding like-minded developers in three straightforward steps.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-(--connections-line) bg-white p-8 shadow-xs"
              >
                <span className="text-3xl font-black text-[#d0d7de]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-black text-(--connections-ink)">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-(--connections-muted)">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Call To Action ── */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-(--connections-ink) px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16 md:px-16">
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-4xl">🚀</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Your next great collaboration starts today.
            </h2>
            <p className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
              Meet thousands of developers around the globe who are ready to build,
              learn, and innovate alongside you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to={user ? ROUTES.HOME : ROUTES.SIGNUP}
                className="btn h-12 rounded-xl border-0 bg-(--connections-coral) px-8 text-sm font-bold text-white shadow-[0_10px_20px_rgba(184,68,50,0.3)] hover:bg-[#9f3829]"
              >
                {user ? "Go to Feed" : "Join CodeBuddy Free"}
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="btn btn-outline h-12 rounded-xl border-slate-600 px-8 text-sm font-bold text-white hover:border-white hover:bg-white hover:text-(--connections-ink)"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
