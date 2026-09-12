import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchConnectionRequest,
  reviewRequest,
} from "../../redux/connections/connectionReducer";
import {
  ArrowIcon,
  CheckIcon,
  CloseIcon,
  SearchIcon,
} from "../icons/ConnectionIcons";
import { DataErrorState } from "../../error/DataErrorState";

const getInitials = (firstName = "", lastName = "") =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "C";
const focusRing =
  "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#234f82]/40";
const pageClass =
  "min-h-[calc(100vh-72px)] bg-[#eef1f5] bg-[linear-gradient(rgba(35,79,130,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(35,79,130,.035)_1px,transparent_1px)] bg-[size:28px_28px] px-4 py-8 text-[#172033] sm:py-12 lg:py-20";
const mutedText = "text-[#4f5b6d]";

export const RequestPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { requests, loading, error } = useSelector((state) => state.connection);

  useEffect(() => {
    dispatch(fetchConnectionRequest());
  }, [dispatch]);

  const handleReview = (status, requestId) =>
    dispatch(reviewRequest({ status, requestId }));

  if (loading)
    return (
      <div className={pageClass}>
        <div
          className="flex min-h-[60vh] items-center justify-center"
          role="status"
          aria-label="Loading requests"
        >
          <span className="loading loading-spinner loading-lg text-[#b84432]" />
        </div>
      </div>
    );

  if (error || !requests)
    return (
      <div className={pageClass}>
        <DataErrorState
          title="Requests are taking a moment"
          message={
            error ||
            "Something went wrong while loading requests. Please try again later."
          }
        />
      </div>
    );

  if (!requests.length)
    return (
      <div className={pageClass}>
        <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
          <span className="flex h-[76px] w-[76px] items-center justify-center rounded-[1.2rem] bg-[#f7ded0] text-3xl font-light text-[#b84432]">
            +
          </span>
          <p className="mb-2 mt-4 text-xs font-extrabold uppercase tracking-[.16em] text-[#b84432]">
            Your inbox
          </p>
          <h1 className="text-[1.7rem] font-extrabold">
            Your network is up to date
          </h1>
          <p className={`mt-1 max-w-[420px] ${mutedText}`}>
            No pending requests right now. Explore the feed and meet someone
            new.
          </p>
          <Link
            to="/"
            className={`mt-6 flex w-full max-w-[200px] items-center justify-center gap-2 rounded-[.7rem] bg-[#172033] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#b84432] ${focusRing}`}
          >
            Explore the feed <ArrowIcon />
          </Link>
        </div>
      </div>
    );

  const visibleRequests = requests.filter((request) => {
    const user = request.fromUserId || {};
    return `${user.firstName || ""} ${user.lastName || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
  });

  return (
    <div className={pageClass}>
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 flex items-center text-xs font-extrabold uppercase tracking-[.16em] text-[#b84432]">
              <span
                className="mr-2 h-2 w-2 rounded-full bg-[#234f82]"
                aria-hidden="true"
              />
              Requests <span className={`mx-1 ${mutedText}`}>/</span> Your inbox
            </p>
            <h1 className="max-w-[650px] text-[clamp(2.2rem,5vw,4.7rem)] font-extrabold leading-[.98] tracking-[-.055em]">
              New people, new possibilities.
            </h1>
            <p
              className={`mt-4 max-w-[500px] text-base leading-relaxed ${mutedText}`}
            >
              Review the people who want to join your CodeBuddy circle.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div
              className="min-w-[150px] border-l border-[#cfd5dc] pl-5"
              aria-label={`${requests.length} pending requests`}
            >
              <span className="mb-1 block text-[.68rem] font-extrabold uppercase tracking-[.12em] text-[#234f82]">
                Needs your reply
              </span>
              <strong className="block text-[2.5rem] leading-none text-[#b84432]">
                {requests.length}
              </strong>
              <span className={`text-xs font-bold ${mutedText}`}>
                pending requests
              </span>
            </div>
            <Link
              to="/connections"
              className={`flex items-center gap-2 text-xs font-extrabold text-[#172033] transition hover:text-[#b84432] ${focusRing}`}
            >
              View connections <ArrowIcon />
            </Link>
          </div>
        </header>

        <div className="grid items-start gap-5 md:grid-cols-[minmax(210px,.34fr)_minmax(0,1fr)]">
          <aside className="rounded-[1.25rem] bg-[#172033] p-6 text-white shadow-[0_16px_30px_rgba(23,32,51,.12)] md:sticky md:top-[5.5rem]">
            <div className="mb-7 flex gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-8 rounded-full bg-[#f3c7a4]" />
              <span className="h-1.5 w-5 rounded-full bg-[#b9d2ed]" />
              <span className="h-1.5 w-2 rounded-full bg-[#e7b5b0]" />
            </div>
            <p className="mb-2 text-[.68rem] font-extrabold uppercase tracking-[.14em] text-[#f3c7a4]">
              Make it intentional
            </p>
            <h2 className="text-[1.55rem] font-extrabold leading-tight tracking-[-.03em]">
              Every good connection starts with a reply.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#cbd2dc]">
              Take a moment to look through each profile, then choose the people
              you would like to welcome in.
            </p>
            <label
              className={`mt-6 flex w-full items-center gap-3 rounded-full border border-transparent bg-white px-4 py-3 focus-within:border-[#b84432] focus-within:ring-3 focus-within:ring-[#b84432]/20 ${focusRing}`}
            >
              <span className={mutedText}>
                <SearchIcon />
              </span>
              <span className="sr-only">Search requests</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search requests"
                className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#596575]"
              />
            </label>
            <div className="mt-6 flex items-baseline gap-2 border-t border-[#3b4658] pt-4">
              <strong className="text-3xl leading-none">
                {visibleRequests.length}
              </strong>
              <span className="text-xs text-[#cbd2dc]">
                {visibleRequests.length === 1 ? "request" : "requests"} to
                review
              </span>
            </div>
          </aside>

          <section
            className="min-w-0 rounded-[1.25rem] border border-[#d6dce3] bg-white/80 p-4 sm:p-5"
            aria-label="Pending connection requests"
          >
            <div className="mb-4 flex flex-col items-start justify-between gap-3 border-b border-[#cfd5dc] px-1 pb-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-1 text-[.68rem] font-extrabold uppercase tracking-[.14em] text-[#234f82]">
                  Pending now
                </p>
                <h2 className="text-[1.35rem] font-extrabold">
                  Review your requests
                </h2>
              </div>
              <span className="rounded-full bg-[#e8f0fa] px-2.5 py-1.5 text-xs font-bold text-[#234f82]">
                {visibleRequests.length}{" "}
                {visibleRequests.length === 1 ? "person" : "people"}
              </span>
            </div>
            {visibleRequests.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {visibleRequests.map((request, index) => {
                  const user = request.fromUserId || {};
                  const { firstName, lastName, age, photoUrl, gender, about } =
                    user;
                  return (
                    <article
                      key={request._id}
                      className={`relative animate-[connection-card-in_.45s_both] overflow-hidden rounded-[.95rem] border border-[#d6dce3] bg-white transition hover:translate-x-1 hover:border-[#b9d2ed] hover:shadow-[0_12px_24px_rgba(23,32,51,.09)] ${index % 3 === 1 ? "hover:border-[#f3c7a4]" : index % 3 === 2 ? "hover:border-[#e7b5b0]" : ""}`}
                    >
                      <div
                        className={`absolute left-0 top-0 h-full w-1 ${index % 3 === 1 ? "bg-[#f3c7a4]" : index % 3 === 2 ? "bg-[#e7b5b0]" : "bg-[#b9d2ed]"}`}
                      />
                      <div className="grid grid-cols-[60px_minmax(0,1fr)] gap-x-4 gap-y-1 p-4 sm:grid-cols-[78px_minmax(0,1fr)] sm:p-5">
                        <div className="row-span-2 flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.15rem] border-4 border-white bg-[#e8f0fa] text-lg font-extrabold text-[#234f82] shadow-[0_4px_12px_rgba(23,32,51,.13)] sm:h-16 sm:w-16">
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={`${firstName || "User"}'s avatar`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span>{getInitials(firstName, lastName)}</span>
                          )}
                        </div>
                        <span className="justify-self-start rounded-full bg-[#fff3e9] px-2.5 py-1.5 text-[.68rem] font-extrabold text-[#984c28]">
                          Wants to connect
                        </span>
                        <div className="mt-0.5">
                          <h3 className="text-[1.2rem] font-extrabold">
                            {firstName} {lastName}
                          </h3>
                          <div
                            className={`mt-1 flex items-center gap-2 text-xs ${mutedText}`}
                          >
                            {age && <span>{age} years</span>}
                            {age && gender && (
                              <i
                                className="h-[3px] w-[3px] rounded-full bg-[#718092]"
                                aria-hidden="true"
                              />
                            )}
                            {gender && <span>{gender}</span>}
                          </div>
                          <p
                            className={`mt-3 line-clamp-3 text-sm leading-relaxed ${mutedText}`}
                          >
                            {about || "I'd like to connect and share ideas."}
                          </p>
                        </div>
                        <div className="col-start-2 flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleReview("rejected", request._id)
                            }
                            className={`flex items-center justify-center gap-2 rounded-[.7rem] bg-[#fbeceb] px-3 py-2.5 text-xs font-extrabold text-[#a33832] transition hover:bg-[#f6d8d5] ${focusRing}`}
                          >
                            <CloseIcon />
                            <span>Decline</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleReview("accepted", request._id)
                            }
                            className={`flex flex-1 items-center justify-center gap-2 rounded-[.7rem] bg-[#172033] px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#b84432] ${focusRing}`}
                          >
                            <CheckIcon />
                            <span>Accept request</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <h2 className="text-[1.7rem] font-extrabold">
                  No requests found
                </h2>
                <p className={`mt-1 ${mutedText}`}>
                  Try a different name or clear your search.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer
          className={`mt-6 flex flex-col gap-2 border-t border-[#cfd5dc] pt-4 text-xs font-bold uppercase tracking-[.04em] sm:flex-row sm:justify-between ${mutedText}`}
        >
          <span>CodeBuddy inbox</span>
          <span>
            Showing {visibleRequests.length} of {requests.length}
          </span>
        </footer>
      </div>
    </div>
  );
};
