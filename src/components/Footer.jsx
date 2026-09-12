export const FooterPage = () => {
  return (
    <footer className="mt-12 border-t border-[var(--connections-line)] bg-[var(--connections-ink)] text-white md:mt-16 lg:mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:gap-12">
          <div className="max-w-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--connections-coral)] text-lg font-black shadow-[0_8px_20px_rgba(184,68,50,0.3)]">
                C
              </span>
              <span className="text-xl font-black tracking-tight">CodeBuddy</span>
            </div>
            <p className="text-sm leading-6 text-slate-300 md:text-base">
              A better way for developers to meet, share ideas, and build what
              comes next together.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--connections-coral)]">
              Explore
            </h2>
            <div className="flex flex-col items-start gap-3 text-sm text-slate-300">
              <a className="transition-colors hover:text-white">About us</a>
              <a className="transition-colors hover:text-white">Contact</a>
            </div>
          </nav>

          <nav aria-label="Social links">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--connections-coral)]">
              Stay connected
            </h2>
            <div className="flex gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-600 text-slate-300 transition-colors hover:border-[var(--connections-coral)] hover:bg-[var(--connections-coral)] hover:text-white"
              title="Follow us on Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-600 text-slate-300 transition-colors hover:border-[var(--connections-coral)] hover:bg-[var(--connections-coral)] hover:text-white"
              title="Subscribe on YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-600 text-slate-300 transition-colors hover:border-[var(--connections-coral)] hover:bg-[var(--connections-coral)] hover:text-white"
              title="Like us on Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-700 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CodeBuddy. All rights reserved.
          </p>
          <p>Connecting developers worldwide</p>
        </div>
      </div>
    </footer>
  );
};
