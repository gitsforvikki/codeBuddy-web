import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/users/userReducer";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    dispatch(registerUser({ firstName, lastName, email, password }));
  };
  const { success } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success]);

  return (
    <div className="min-h-[calc(100vh-200px)] overflow-hidden bg-[#f0f4f1] px-4 py-8 sm:px-6 md:py-14">
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-[#d9e8df] blur-3xl" />
        <div className="absolute -right-24 bottom-12 h-64 w-64 rounded-full bg-[#f5d8ce] blur-3xl" />

        <section className="relative px-2 py-4 md:px-6 lg:py-12">
          <div className="mb-10 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-(--connections-ink) text-xl font-black text-white shadow-[0_10px_24px_rgba(23,32,51,0.2)]">
              C
            </span>
            <span className="text-xl font-black tracking-tight text-(--connections-ink)">
              CodeBuddy
            </span>
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-(--connections-coral)">
            Start your next chapter
          </p>
          <h1 className="max-w-lg text-4xl font-black leading-[1.02] tracking-tight text-(--connections-ink) md:text-6xl">
            Your next great connection is one profile away.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-(--connections-muted) md:text-lg">
            Build a developer identity that attracts curious people, useful
            conversations, and unexpected opportunities.
          </p>

          <div className="relative mt-12 max-w-md">
            <div className="absolute -right-2 -top-7 z-10 rotate-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_14px_30px_rgba(23,32,51,0.12)] md:right-4">
              <p className="text-xs font-bold text-(--connections-ink)">
                ✨ New circle unlocked
              </p>
              <p className="mt-1 text-[10px] text-(--connections-muted)">
                3 shared interests
              </p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-(--connections-muted)">
                    Your people
                  </p>
                  <p className="mt-2 text-2xl font-black text-(--connections-ink)">
                    ∞ possibilities
                  </p>
                </div>
                <div className="flex -space-x-3 text-2xl">
                  <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#f0f4f1] bg-[#f1a08f]">
                    👩‍💻
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#f0f4f1] bg-[#d9e8df]">
                    🧑‍🚀
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#f0f4f1] bg-[#e8e1d4]">
                    👨‍🔬
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-(--connections-muted)">
                <span className="h-2 w-2 rounded-full bg-[#5d9b72]" />
                Developers are building together right now
              </div>
            </div>
          </div>
        </section>

        <section className="relative rotate-0 rounded-[2.25rem] border border-white bg-white/90 p-2 shadow-[0_28px_80px_rgba(23,32,51,0.14)] sm:p-3 lg:rotate-1">
          <div className="rounded-[1.9rem] bg-(--connections-ink) p-6 text-white sm:p-8 md:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f1a08f]">
                  Create your profile
                </p>
                <h2 className="text-3xl font-black md:text-4xl">
                  Make an entrance.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                  Four details are enough to start meeting the right people.
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-xl">
                ✦
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-bold text-white">
                    First name
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered h-12 w-full border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:border-[#f1a08f] focus:outline-none"
                    placeholder="Ada"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-bold text-white">
                    Last name
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered h-12 w-full border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:border-[#f1a08f] focus:outline-none"
                    placeholder="Lovelace"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-bold text-white">
                  Email address
                </legend>
                <input
                  type="email"
                  className="input input-bordered h-12 w-full border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:border-[#f1a08f] focus:outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-bold text-white">
                  Create a password
                </legend>
                <input
                  type="password"
                  className="input input-bordered h-12 w-full border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus:border-[#f1a08f] focus:outline-none"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="mt-1 text-xs leading-5 text-slate-400">
                  Use a mix of letters, numbers, and symbols.
                </label>
              </fieldset>
            </div>

            <button
              className="btn mt-7 h-13 w-full rounded-xl border-0 bg-(--connections-coral) text-base font-bold text-white shadow-[0_12px_24px_rgba(184,68,50,0.22)] hover:bg-[#9f3829] disabled:bg-slate-500 disabled:text-slate-300 disabled:shadow-none"
              onClick={handleRegister}
              disabled={!firstName || !lastName || !email || !password}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Launch my profile
            </button>

            <p className="mt-5 text-center text-xs text-slate-400">
              By signing up, you agree to our{" "}
              <a href="#" className="font-bold text-[#f1a08f] hover:text-white">
                Terms of Service
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 px-4 py-4 text-sm sm:flex-row sm:px-6">
            <p className="text-(--connections-muted)">
              Already part of the circle?
            </p>
            <Link
              to="/login"
              className="font-bold text-(--connections-blue) transition-colors hover:text-(--connections-coral)"
            >
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
