import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, sendRequest } from "../redux/connections/connectionReducer";
import { FeedCard } from "./cards/FeedCard";
import { FeedShimmer } from "./simmerUi/ShimmerUi";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.connection);
  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!feed) return <FeedShimmer />;
  if (feed?.length <= 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className="text-7xl md:text-8xl">🎯</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            You've Reviewed Everyone!
          </h1>
          <p className="text-base md:text-lg text-base-content/70 text-center max-w-lg">
            No new profiles available at the moment. Check back soon for more
            developers to connect with!
          </p>
          <div className="mt-6 space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row">
            <button
              onClick={() => dispatch(getFeed())}
              className="btn btn-primary btn-lg"
            >
              Refresh Feed
            </button>
            <button className="btn btn-outline btn-lg">View Connections</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-(--connections-cream) px-4 py-8 md:px-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-(--connections-coral)">
              Your discovery space
            </p>
            <h1 className="text-3xl font-black tracking-tight text-(--connections-ink) md:text-5xl">
              Meet your next collaborator.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-(--connections-muted) md:text-base">
              Browse developers with shared interests, complementary skills, and
              ideas worth building together.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-2xl border border-(--connections-line) bg-white px-4 py-3 shadow-sm md:self-auto">
            <span className="h-2.5 w-2.5 rounded-full bg-[#5d9b72] shadow-[0_0_0_4px_rgba(93,155,114,0.14)]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-(--connections-muted)">
                Profiles waiting
              </p>
              <p className="text-lg font-black text-(--connections-ink)">
                {feed.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(360px,1fr)_minmax(0,0.8fr)] lg:gap-10">
          <section className="order-2 rounded-4xl bg-(--connections-ink) p-7 text-white shadow-[0_18px_45px_rgba(23,32,51,0.16)] lg:order-1 lg:mt-14">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#f1a08f]">
              Find your people
            </p>
            <h2 className="text-3xl font-black leading-tight">
              The next great project could start here.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Discover developers who bring a different perspective, skill set,
              or spark to the table.
            </p>
            <div className="mt-8 space-y-4 border-t border-slate-700 pt-6">
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-sm">
                  01
                </span>
                <div>
                  <p className="font-bold">Read the profile</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Look for a shared interest or useful complement.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-sm">
                  02
                </span>
                <div>
                  <p className="font-bold">Make a thoughtful choice</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    A genuine connection beats collecting contacts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="order-1 flex justify-center lg:order-2">
            {feed && feed.length > 0 && (
              <div className="w-full max-w-md rounded-4xl border border-(--connections-line) bg-white p-4 shadow-[0_24px_70px_rgba(23,32,51,0.08)] md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-(--connections-line) pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-(--connections-muted)">
                      Today&apos;s suggestion
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold text-(--connections-ink)">
                      Start with a great introduction
                    </h2>
                  </div>
                  <span className="hidden rounded-full bg-[#f5e7df] px-3 py-1.5 text-xs font-bold text-(--connections-coral) sm:inline-flex">
                    01 / {feed.length}
                  </span>
                </div>
                <FeedCard
                  key={feed[0]._id}
                  user={feed[0]}
                  onInterested={() =>
                    dispatch(
                      sendRequest({
                        status: "interested",
                        requestId: feed[0]._id,
                      }),
                    )
                  }
                  onIgnored={() =>
                    dispatch(
                      sendRequest({
                        status: "interested",
                        requestId: feed[0]._id,
                      }),
                    )
                  }
                />

                {/* Progress Indicator */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-(--connections-muted) md:text-sm">
                    Profile 1 of {feed.length} available
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-[#e7ebee]">
                    <div
                      className="h-2 rounded-full bg-(--connections-coral) transition-all"
                      style={{ width: `${(1 / feed.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <section className="order-3 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-1">
            <div className="rounded-2xl border border-(--connections-line) bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f5e7df] text-2xl">
                  🤝
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-(--connections-coral)">
                  Built for humans
                </span>
              </div>
              <h2 className="font-extrabold text-(--connections-ink)">
                Real conversations, not cold outreach.
              </h2>
              <p className="mt-2 text-sm leading-6 text-(--connections-muted)">
                Connect around shared interests and let the conversation grow
                naturally.
              </p>
            </div>
            <div className="rounded-2xl border border-(--connections-line) bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e6eef7] text-2xl">
                  💬
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-(--connections-blue)">
                  Stay curious
                </span>
              </div>
              <h2 className="font-extrabold text-(--connections-ink)">
                Every profile is a new possibility.
              </h2>
              <p className="mt-2 text-sm leading-6 text-(--connections-muted)">
                The best collaborations often begin with one unexpected
                introduction.
              </p>
            </div>
          </section>
        </div>

        {/* Info Section */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
          <div className="rounded-2xl border border-(--connections-line) bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">💼</div>
            <h3 className="font-extrabold text-(--connections-ink)">
              Professional network
            </h3>
            <p className="mt-2 text-sm leading-6 text-(--connections-muted)">
              Connect with developers from around the world
            </p>
          </div>

          <div className="rounded-2xl border border-(--connections-line) bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">🤝</div>
            <h3 className="font-extrabold text-(--connections-ink)">
              Real connections
            </h3>
            <p className="mt-2 text-sm leading-6 text-(--connections-muted)">
              Build meaningful relationships with like-minded professionals
            </p>
          </div>

          <div className="rounded-2xl border border-(--connections-line) bg-white p-5 shadow-sm">
            <div className="mb-3 text-3xl">💬</div>
            <h3 className="font-extrabold text-(--connections-ink)">
              Easy chat
            </h3>
            <p className="mt-2 text-sm leading-6 text-(--connections-muted)">
              Start conversations instantly with accepted connections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
