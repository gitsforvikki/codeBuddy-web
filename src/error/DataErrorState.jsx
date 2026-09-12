import { Link } from "react-router-dom";

// Shared data errors keep recovery messaging consistent across related pages.
export const DataErrorState = ({ title, message }) => (
  <div className="flex min-h-[390px] flex-col items-center justify-center px-4 text-center">
    <span className="flex h-19 w-19 items-center justify-center rounded-3xl bg-[#fae2dc] text-3xl font-light text-[#bd4e39]">
      !
    </span>
    <h1 className="mt-4 text-[1.7rem] font-extrabold text-[#172033]">{title}</h1>
    <p className="mt-1 max-w-105 text-[#4f5b6d]">{message}</p>
    <Link
      to="/"
      className="mt-6 rounded-[.7rem] bg-[#172033] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#b84432] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#234f82]/40"
    >
      Return home
    </Link>
  </div>
);
