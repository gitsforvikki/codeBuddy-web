import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/users/userReducer";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { user, error } = useSelector((state) => state.user);

  const handleLoginReqest = () => {
    if (user) return;
    setSubmitted(true);
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-[calc(100vh-200px)] bg-(--connections-cream) px-4 py-8 sm:px-6 md:py-14">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-4xl border border-(--connections-line) bg-white shadow-[0_28px_80px_rgba(23,32,51,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative overflow-hidden bg-(--connections-ink) px-7 py-10 text-white sm:px-10 md:px-14 md:py-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-34 border-(--connections-coral)/20" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-34 border-[#e6eef7]/10" />
          <div className="relative flex h-full min-h-130 flex-col justify-between">
            <div>
              <div className="mb-12 flex items-center gap-3">
                <img
                  src="/codebuddy-mark.svg"
                  alt=""
                  className="h-11 w-11 rounded-2xl shadow-[0_10px_24px_rgba(184,68,50,0.35)]"
                />
                <span className="text-xl font-black tracking-tight">
                  CodeBuddy
                </span>
              </div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f1a08f]">
                Your developer circle
              </p>
              <h1 className="max-w-md text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Build better things, together.
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-300 md:text-lg">
                Find curious minds, exchange ideas, and turn a great
                introduction into your next meaningful collaboration.
              </p>
            </div>

            <div className="relative mt-12">
              <div className="absolute -right-2 -top-8 hidden rotate-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur sm:block md:right-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#f1a08f] text-sm">
                    ⚡
                  </span>
                  <div>
                    <p className="text-xs font-bold">New idea unlocked</p>
                    <p className="text-[10px] text-slate-300">
                      shared interests
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-(--connections-ink) bg-[#f1a08f] text-lg">
                      👩‍💻
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-(--connections-ink) bg-[#e6eef7] text-lg">
                      🧑‍🚀
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-(--connections-ink) bg-[#e8e1d4] text-lg">
                      👨‍🔬
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">A network with range</p>
                    <p className="mt-1 text-xs text-slate-300">
                      Different skills. Shared momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="px-6 py-10 sm:px-10 md:px-14 md:py-14">
          <div className="mx-auto max-w-md">
            <div className="mb-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-(--connections-coral)">
                Welcome back
              </p>
              <h2 className="text-3xl font-black tracking-tight text-(--connections-ink) md:text-4xl">
                Pick up where you left off.
              </h2>
              <p className="mt-3 text-sm leading-6 text-(--connections-muted)">
                Sign in to see new people, continue conversations, and keep your
                ideas moving.
              </p>
            </div>

            {error && submitted && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#e6b8ae] bg-[#fff3f0] p-4 text-sm text-[#8f2f22]">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9.002 9.002 0 1020.92 17.53"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-bold text-(--connections-ink)">
                  Email address
                </legend>
                <input
                  type="email"
                  className="input input-bordered h-13 w-full border-(--connections-line) bg-[#f8fafb] text-(--connections-ink) placeholder:text-[#8791a0] focus:border-(--connections-blue) focus:outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLoginReqest()}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-bold text-(--connections-ink)">
                  Password
                </legend>
                <input
                  type="password"
                  className="input input-bordered h-13 w-full border-(--connections-line) bg-[#f8fafb] text-(--connections-ink) placeholder:text-[#8791a0] focus:border-(--connections-blue) focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLoginReqest()}
                />
              </fieldset>
            </div>

            <button
              className="btn mt-7 h-13 w-full rounded-xl border-0 bg-(--connections-coral) text-base font-bold text-white shadow-[0_12px_24px_rgba(184,68,50,0.22)] hover:bg-[#9f3829] disabled:bg-[#c8ced5] disabled:text-[#687385] disabled:shadow-none"
              onClick={handleLoginReqest}
              disabled={!email || !password}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 013-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign in to CodeBuddy
            </button>

            {error && submitted && (
              <div className="mt-5 text-center">
                <Link
                  to="/reset-password"
                  className="text-sm font-bold text-(--connections-blue) transition-colors hover:text-(--connections-coral)"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="my-8 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-[#9aa3af]">
              <span className="h-px flex-1 bg-(--connections-line)" />
              or
              <span className="h-px flex-1 bg-(--connections-line)" />
            </div>

            <div className="rounded-2xl border border-(--connections-line) bg-[#f8fafb] p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e6eef7] text-lg">
                  ✦
                </span>
                <div>
                  <p className="text-sm font-bold text-(--connections-ink)">
                    New to the network?
                  </p>
                  <p className="mt-1 text-xs leading-5 text-(--connections-muted)">
                    Create your profile and meet developers who share your
                    curiosity.
                  </p>
                  <Link
                    to="/signup"
                    className="mt-3 inline-flex text-sm font-bold text-(--connections-blue) transition-colors hover:text-(--connections-coral)"
                  >
                    Create an account{" "}
                    <span className="ml-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-(--connections-muted)">
              <span>🌐 Global network</span>
              <span>💬 Easy chat</span>
              <span>🔒 Private by design</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
