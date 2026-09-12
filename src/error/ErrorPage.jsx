import { Link, useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const status = error?.status || 404;
  const isNotFound = status === 404;
  const title = isNotFound
    ? "This page took a wrong turn"
    : "Something needs attention";
  const message = isNotFound
    ? "The page you are looking for may have moved, been removed, or never existed."
    : "We could not load this page right now. Please return home and try again.";

  return (
    <div className="relative flex min-h-[calc(100vh-9rem)] items-center justify-center overflow-hidden bg-[#fbfaf7] px-4 py-16 text-[#172033]">
      {/* Keep the recovery path useful while giving the error a human tone. */}
      <div
        className="absolute -left-16 top-20 h-40 w-40 rounded-full bg-[#f7ded0]/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-12 bottom-12 h-48 w-48 rounded-full bg-[#dbe8f5]/80 blur-3xl"
        aria-hidden="true"
      />

      <section className="relative w-full max-w-2xl rounded-3xl border border-[#cfd5dc] bg-white/90 p-7 text-center shadow-[0_20px_60px_rgba(23,32,51,.1)] sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-[#172033] text-2xl font-extrabold tracking-tight text-white shadow-[8px_8px_0_#f3c7a4]">
          {status}
        </div>
        <p className="mt-8 text-xs font-extrabold uppercase tracking-[.18em] text-[#b84432]">
          CodeBuddy navigation
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-[-.03em] sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#4f5b6d] sm:text-base">
          {message}
        </p>
        {error?.statusText && (
          <p className="mt-3 text-xs font-semibold text-[#687181]">
            {error.statusText}
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-[.7rem] bg-[#172033] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#b84432] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#234f82]/40"
          >
            Return home
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-[.7rem] border border-[#cfd5dc] bg-white px-5 py-3 text-sm font-extrabold text-[#172033] transition hover:border-[#b84432] hover:text-[#b84432] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#234f82]/40"
          >
            Go back
          </button>
        </div>
      </section>
    </div>
  );
};
