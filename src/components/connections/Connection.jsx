import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllConnection } from "../../redux/connections/connectionReducer";
import { ArrowIcon, ChatIcon, SearchIcon } from "../icons/ConnectionIcons";
import { DataErrorState } from "../../error/DataErrorState";
import { ConnectionsShimmer } from "../simmerUi/ShimmerUi";
import { ROUTES } from "../../utils/routes";

const getInitials = (firstName = "", lastName = "") =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "CB";

export const Connections = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { connections, loading, error } = useSelector(
    (state) => state.connection,
  );

  useEffect(() => {
    dispatch(getAllConnection());
  }, [dispatch]);

  if (loading) {
    return <ConnectionsShimmer />;
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-(--connections-cream) px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <DataErrorState
            title="We couldn't load your connections"
            message={error}
          />
        </div>
      </div>
    );
  }

  if (!connections?.length) {
    return (
      <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-(--connections-cream) px-4 py-16 text-(--connections-ink) sm:py-24">
        {/* Ambient background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#f7ded0]/80 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#dbe8f5]/80 blur-3xl"
        />

        <div className="relative mx-auto max-w-md text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#f7ded0] text-4xl shadow-xs">
            🤝
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-(--connections-coral)">
            Your Network
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl">
            Your circle starts here.
          </h1>
          <p className="mt-3 text-sm leading-6 text-(--connections-muted)">
            You haven't formed any connections yet. Head to the discovery feed
            to explore curious developers and start building your network.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={ROUTES.HOME}
              className="btn h-12 w-full rounded-xl border-0 bg-(--connections-coral) px-6 text-sm font-bold text-white shadow-[0_10px_20px_rgba(184,68,50,0.22)] hover:bg-[#9f3829] sm:w-auto"
            >
              Explore Discover Feed <ArrowIcon />
            </Link>
            <Link
              to={ROUTES.REQUESTS}
              className="btn btn-outline h-12 w-full rounded-xl border-(--connections-line) bg-white px-6 text-sm font-bold text-(--connections-ink) hover:border-(--connections-ink) hover:bg-(--connections-ink) hover:text-white sm:w-auto"
            >
              Check Requests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter connections by search term and filter tab
  const visibleConnections = connections.filter((conn) => {
    const fullName = `${conn?.firstName || ""} ${conn?.lastName || ""}`.toLowerCase();
    const skills = (conn?.skills || []).join(" ").toLowerCase();
    const about = (conn?.about || "").toLowerCase();
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      fullName.includes(term) || skills.includes(term) || about.includes(term);

    if (!matchesSearch) return false;

    if (selectedFilter === "premium") {
      return conn?.isPremium || conn?.membershipType?.toLowerCase() === "gold" || conn?.membershipType?.toLowerCase() === "silver";
    }
    if (selectedFilter === "skills") {
      return conn?.skills && conn.skills.length > 0;
    }
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-72px)] bg-(--connections-cream) px-4 py-8 text-(--connections-ink) sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        
        {/* ── Page Header ── */}
        <header className="relative mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--connections-line) bg-white px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-(--connections-coral) shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-(--connections-coral) animate-pulse" />
              Your Developer Network
            </div>
            <h1 className="text-3xl font-black tracking-tight text-(--connections-ink) sm:text-4xl md:text-5xl lg:text-6xl">
              People worth knowing.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-(--connections-muted)">
              Keep your best technical peers close, explore complementary skills,
              and stay connected through real-time chat.
            </p>
          </div>

          {/* Network Stats Card */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-3xl border border-(--connections-line) bg-white p-4 shadow-xs">
              <div className="border-r border-slate-200 pr-5">
                <span className="text-[10px] font-black uppercase tracking-wider text-(--connections-blue)">
                  Connections
                </span>
                <p className="text-3xl font-black text-(--connections-coral)">
                  {connections.length}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Ready to Chat
                </span>
                <p className="text-sm font-extrabold text-(--connections-ink)">
                  Instant Messaging
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to={ROUTES.HOME}
                className="btn h-11 rounded-xl border-0 bg-(--connections-ink) px-5 text-xs font-bold text-white shadow-xs hover:bg-(--connections-coral)"
              >
                + Meet New People
              </Link>
              <Link
                to={ROUTES.REQUESTS}
                className="btn btn-outline h-11 rounded-xl border-(--connections-line) bg-white px-5 text-xs font-bold text-(--connections-ink) hover:border-(--connections-ink) hover:bg-white hover:text-(--connections-coral)"
              >
                Pending Requests →
              </Link>
            </div>
          </div>
        </header>

        {/* ── Search & Filter Controls ── */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-(--connections-line) bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-5">
          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, role, or skills (e.g. React)..."
              className="h-11 w-full rounded-2xl border border-(--connections-line) bg-[#f8fafb] pl-10 pr-4 text-xs font-medium text-(--connections-ink) placeholder:text-slate-400 focus:border-(--connections-coral) focus:bg-white focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Network" },
              { id: "premium", label: "👑 Premium" },
              { id: "skills", label: "⚡ Has Skills" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedFilter === tab.id
                    ? "bg-(--connections-ink) text-white shadow-xs"
                    : "border border-(--connections-line) bg-[#f8fafb] text-(--connections-muted) hover:border-slate-400 hover:text-(--connections-ink)"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <span className="ml-2 text-xs font-bold text-slate-400">
              {visibleConnections.length} {visibleConnections.length === 1 ? "buddy" : "buddies"}
            </span>
          </div>
        </div>

        {/* ── Connections Grid ── */}
        {visibleConnections.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleConnections.map((conn) => {
              const isGold = conn?.membershipType?.toLowerCase() === "gold";
              const isSilver = conn?.membershipType?.toLowerCase() === "silver";

              return (
                <article
                  key={conn?._id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-(--connections-line) bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-(--connections-coral) hover:shadow-[0_20px_40px_rgba(23,32,51,0.09)]"
                >
                  {/* Subtle top glow bar for premium members */}
                  {isGold && (
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500" />
                  )}
                  {isSilver && (
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300" />
                  )}

                  <div>
                    {/* Top row: Avatar & Status Badge */}
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <div className="h-16 w-16 overflow-hidden rounded-2xl bg-[#f7ded0] ring-4 ring-white shadow-md">
                          {conn?.photoUrl ? (
                            <img
                              src={conn.photoUrl}
                              alt={`${conn?.firstName}'s avatar`}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <span className="grid h-full w-full place-items-center text-lg font-black text-(--connections-coral)">
                              {getInitials(conn?.firstName, conn?.lastName)}
                            </span>
                          )}
                        </div>
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                      </div>

                      {/* Membership / Badge */}
                      <div className="flex flex-col items-end gap-1">
                        {isGold && (
                          <span className="rounded-full bg-gradient-to-r from-amber-100 to-yellow-200 px-3 py-1 text-[10px] font-black text-amber-900 shadow-2xs">
                            👑 Gold Member
                          </span>
                        )}
                        {isSilver && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-700 shadow-2xs">
                            ✦ Silver Member
                          </span>
                        )}
                        {!isGold && !isSilver && (
                          <span className="rounded-full bg-[#f0f4f1] px-3 py-1 text-[10px] font-bold text-[#2c6e49]">
                            ✓ Connected
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Developer Details */}
                    <div className="mt-5">
                      <h2 className="text-xl font-black tracking-tight text-(--connections-ink) group-hover:text-(--connections-coral)">
                        {conn?.firstName} {conn?.lastName}
                      </h2>

                      {/* Age & Gender info */}
                      <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-(--connections-muted)">
                        {conn?.age && <span>{conn.age} yrs</span>}
                        {conn?.age && conn?.gender && <span>•</span>}
                        {conn?.gender && (
                          <span className="capitalize">{conn.gender}</span>
                        )}
                      </div>

                      {/* About Snippet */}
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-(--connections-muted)">
                        {conn?.about || "Excited to collaborate on interesting engineering projects."}
                      </p>

                      {/* Skills Tags */}
                      {conn?.skills && conn.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {conn.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-lg border border-(--connections-line)/70 bg-[#f8fafb] px-2.5 py-1 text-[10px] font-bold text-(--connections-blue)"
                            >
                              #{skill}
                            </span>
                          ))}
                          {conn.skills.length > 3 && (
                            <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                              +{conn.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <Link
                      to={`/chat/${conn?._id}`}
                      className="btn h-11 w-full rounded-xl border-0 bg-(--connections-ink) text-xs font-bold text-white shadow-xs transition-all hover:bg-(--connections-coral) hover:shadow-md"
                    >
                      <ChatIcon />
                      <span>Start Direct Chat</span>
                      <ArrowIcon />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search Filter State */
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-(--connections-line) bg-white p-8 text-center">
            <span className="text-4xl">🔍</span>
            <h2 className="mt-4 text-xl font-black text-(--connections-ink)">
              No matching connections found
            </h2>
            <p className="mt-1 max-w-sm text-xs leading-5 text-(--connections-muted)">
              We couldn't find anyone matching "{searchTerm}". Try clearing your search or filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="btn mt-5 h-10 rounded-xl border border-(--connections-line) bg-[#f8fafb] px-5 text-xs font-bold text-(--connections-ink) hover:bg-white"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-(--connections-line) pt-6 text-xs font-bold text-(--connections-muted) sm:flex-row">
          <span>CodeBuddy Verified Network</span>
          <span>
            Displaying {visibleConnections.length} of {connections.length} buddies
          </span>
        </div>
      </div>
    </div>
  );
};

export default Connections;
