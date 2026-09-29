import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const helpfulLinks = [
    {
      title: "Discover Developers",
      description: "Explore profiles, match interests, and find new peers",
      to: ROUTES.HOME,
      icon: "⚡",
      badge: "Main Feed",
    },
    {
      title: "Your Connections",
      description: "View pending requests and chat with connected buddies",
      to: ROUTES.CONNECTIONS,
      icon: "🤝",
      badge: "Network",
    },
    {
      title: "About CodeBuddy",
      description: "Learn how we build developer synergy and community",
      to: ROUTES.ABOUT,
      icon: "✦",
      badge: "Story",
    },
    {
      title: "Contact & Support",
      description: "Have questions or need assistance? Reach out to our team",
      to: ROUTES.CONTACT,
      icon: "💬",
      badge: "Help",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-(--connections-cream) px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#f7ded0]/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-[#dbe8f5]/80 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Main 404 card */}
        <section className="overflow-hidden rounded-4xl border border-(--connections-line) bg-white/95 p-6 shadow-[0_24px_60px_rgba(23,32,51,0.08)] backdrop-blur sm:p-10 md:p-14">
          <div className="flex flex-col items-center text-center">
            {/* 404 Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f1a08f]/60 bg-[#fff3f0] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-(--connections-coral)">
              <span className="h-2 w-2 rounded-full bg-(--connections-coral) animate-pulse" />
              Error 404 • Route Not Found
            </div>

            {/* Stylized Big Error Number */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="text-7xl font-black tracking-tighter text-(--connections-ink) sm:text-8xl md:text-9xl">
                4
              </span>
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-(--connections-ink) text-4xl shadow-[0_12px_28px_rgba(23,32,51,0.25)] sm:h-24 sm:w-24 sm:text-5xl md:h-28 md:w-28 md:text-6xl">
                <span className="rotate-12 transition-transform hover:rotate-0">
                  🔌
                </span>
              </div>
              <span className="text-7xl font-black tracking-tighter text-(--connections-ink) sm:text-8xl md:text-9xl">
                4
              </span>
            </div>

            {/* Heading and message */}
            <h1 className="mt-6 max-w-xl text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl md:text-5xl">
              Lost in the codebase?
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-(--connections-muted) sm:text-lg">
              The page you are looking for doesn’t exist, was renamed, or has
              been merged into another branch.
            </p>

            {/* Interactive Terminal Snippet */}
            <div className="mt-8 w-full max-w-md rounded-2xl bg-(--connections-ink) p-4 text-left font-mono text-xs text-slate-300 shadow-inner">
              <div className="mb-2 flex items-center gap-1.5 border-b border-slate-700/80 pb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[10px] text-slate-400">
                  router-diagnostics.sh
                </span>
              </div>
              <p className="text-slate-400">
                <span className="text-(--connections-coral)">$</span> check-route{" "}
                <span className="text-emerald-400">{window.location.pathname}</span>
              </p>
              <p className="mt-1 text-rose-400">
                [404] No matching route registered in tree.
              </p>
              <p className="mt-0.5 text-slate-400">
                Suggestion: return to index or check navigation links below.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to={ROUTES.HOME}
                className="btn h-12 rounded-xl border-0 bg-(--connections-coral) px-7 text-sm font-bold text-white shadow-[0_10px_20px_rgba(184,68,50,0.22)] hover:bg-[#9f3829]"
              >
                Return to Discover
              </Link>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline h-12 rounded-xl border-(--connections-line) bg-white px-7 text-sm font-bold text-(--connections-ink) hover:border-(--connections-ink) hover:bg-(--connections-ink) hover:text-white"
              >
                ← Go Back
              </button>
            </div>
          </div>

          {/* Quick shortcuts */}
          <div className="mt-12 border-t border-(--connections-line) pt-10">
            <h2 className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-(--connections-muted)">
              Popular destinations
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {helpfulLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group flex items-start gap-4 rounded-2xl border border-(--connections-line) bg-[#f8fafb] p-4 transition-all hover:border-(--connections-coral) hover:bg-white hover:shadow-sm"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-xl shadow-xs transition-transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-(--connections-ink) group-hover:text-(--connections-coral)">
                        {item.title}
                      </p>
                      <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-(--connections-muted) shadow-2xs">
                        {item.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-(--connections-muted)">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFoundPage;
