import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ResetPasswordShimmer } from "../simmerUi/ShimmerUi";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { authLoading, user } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (authLoading || !user) return <ResetPasswordShimmer />;

  const handleResetPassword = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/auth/reset-password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true },
      );
      console.log("res:- " + res);
      if (res.status === 200) {
        toast.success("Password reset successfully.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[var(--connections-cream)] px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--connections-line)] bg-white shadow-[0_24px_70px_rgba(23,32,51,0.1)] lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative overflow-hidden bg-[var(--connections-ink)] px-7 py-10 text-white md:px-10 md:py-12">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[24px] border-[var(--connections-coral)]/30" />
          <div className="relative flex h-full flex-col justify-between gap-12">
            <div>
              <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--connections-coral)] text-xl font-black shadow-[0_10px_24px_rgba(184,68,50,0.3)]">
                C
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#f1a08f]">
                Account security
              </p>
              <h1 className="max-w-xs text-3xl font-black leading-tight md:text-4xl">
                Keep your account in your hands.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300 md:text-base">
                A strong, private password helps protect your profile and the
                conversations you build on CodeBuddy.
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-700 pt-5 text-xs text-slate-400">
              <svg
                className="h-5 w-5 text-[#f1a08f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v1h8z"
                />
              </svg>
              Your password stays private
            </div>
          </div>
        </aside>

        <section className="px-6 py-8 sm:px-8 md:px-12 md:py-12">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--connections-coral)]">
              Update credentials
            </p>
            <h2 className="text-2xl font-black text-[var(--connections-ink)] md:text-3xl">
              Reset your password
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--connections-muted)]">
              Enter your current password, then choose a new one you have not
              used elsewhere.
            </p>
          </div>

          <div className="space-y-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                Current password
              </legend>
              <input
                type="password"
                className="input input-bordered h-12 w-full border-[var(--connections-line)] bg-[#f8fafb] text-[var(--connections-ink)] focus:border-[var(--connections-blue)] focus:outline-none"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                New password
              </legend>
              <input
                type="password"
                className="input input-bordered h-12 w-full border-[var(--connections-line)] bg-[#f8fafb] text-[var(--connections-ink)] focus:border-[var(--connections-blue)] focus:outline-none"
                placeholder="Create a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="mt-1 text-xs leading-5 text-[var(--connections-muted)]">
                Use at least 8 characters with a mix of letters, numbers, and
                symbols.
              </label>
            </fieldset>
          </div>

          <button
            className="btn mt-7 h-13 w-full rounded-xl border-0 bg-[var(--connections-coral)] text-base font-bold text-white shadow-[0_12px_24px_rgba(184,68,50,0.22)] hover:bg-[#9f3829] disabled:bg-[#c8ced5] disabled:text-[#687385] disabled:shadow-none"
            onClick={handleResetPassword}
            disabled={!oldPassword || !newPassword}
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Reset password
          </button>

          <div className="mt-8 rounded-2xl border border-[#d7e2ec] bg-[#f3f7fa] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--connections-blue)]">
              Password checklist
            </p>
            <ul className="grid gap-2 text-xs text-[var(--connections-muted)] sm:grid-cols-2">
              <li>✓ Uppercase and lowercase letters</li>
              <li>✓ Numbers and special characters</li>
              <li>✓ No personal information</li>
              <li>✓ At least 8 characters</li>
            </ul>
          </div>

          <p className="mt-7 text-center text-sm text-[var(--connections-muted)]">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-bold text-[var(--connections-blue)] transition-colors hover:text-[var(--connections-coral)]"
            >
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};
