import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllConnection } from "../../redux/connections/connectionReducer";
import { ArrowIcon, ChatIcon, SearchIcon } from "../icons/ConnectionIcons";
import { DataErrorState } from "../../error/DataErrorState";

const getInitials = (firstName = "", lastName = "") =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "C";

const pageClass =
  "min-h-[calc(100vh-72px)] bg-[#fbfaf7] px-4 py-8 text-[#172033] sm:py-12 lg:py-20";
const shellClass = "mx-auto max-w-[1180px]";
const mutedText = "text-[#4f5b6d]";
const focusRing =
  "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#234f82]/40";

export const Connections = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { connections, loading, error } = useSelector(
    (state) => state.connection,
  );

  useEffect(() => {
    dispatch(getAllConnection());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={pageClass}>
        <div
          className="flex min-h-[60vh] items-center justify-center"
          role="status"
          aria-label="Loading connections"
        >
          <span className="loading loading-spinner loading-lg text-[#b84432]" />
        </div>
      </div>
    );
  }


  if (!connections?.length) {
    return (
      <div className={pageClass}>
        <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
          <span className="flex h-[76px] w-[76px] items-center justify-center rounded-[1.2rem] bg-[#f7ded0] text-3xl font-light text-[#b84432]">
            +
          </span>
          <p className="mb-2 mt-4 text-xs font-extrabold uppercase tracking-[.16em] text-[#b84432]">
            Your network
          </p>
          <h1 className="text-[1.7rem] font-extrabold">
            Your circle starts here
          </h1>
          <p className={`mt-1 max-w-[420px] ${mutedText}`}>
            Find thoughtful people in the feed and start building your CodeBuddy
            network.
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
  }


  if (error) {
    return (
      <div className={pageClass}>
        <DataErrorState
          title="We couldn't load your connections"
          message={error}
        />
      </div>
    );
  }
  

  const visibleConnections = connections.filter((connection) =>
    `${connection?.firstName || ""} ${connection?.lastName || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div className={pageClass}>
      <div className={shellClass}>
        <header className="relative mb-8 flex flex-col justify-between gap-6 sm:mb-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 flex items-center text-xs font-extrabold uppercase tracking-[.16em] text-[#b84432]">
              <span
                className="mr-2 h-2 w-2 rounded-full bg-[#b84432]"
                aria-hidden="true"
              />
              Connections <span className={`mx-1 ${mutedText}`}>/</span> Your
              network
            </p>
            <h1 className="max-w-[650px] text-[clamp(2.2rem,5vw,4.7rem)] font-extrabold leading-[.98] tracking-[-.055em]">
              People worth knowing.
            </h1>
            <p
              className={`mt-4 max-w-[500px] text-base leading-relaxed ${mutedText}`}
            >
              Keep your best conversations close and turn shared interests into
              momentum.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div
              className="relative min-w-[150px] border-l border-[#cfd5dc] pl-5"
              aria-label={`${connections.length} total connections`}
            >
              <span className="relative z-10 mb-1 block text-[.68rem] font-extrabold uppercase tracking-[.12em] text-[#234f82]">
                Network size
              </span>
              <strong className="relative z-10 block text-[2.5rem] leading-none text-[#b84432]">
                {connections.length}
              </strong>
              <span className={`relative z-10 text-xs font-bold ${mutedText}`}>
                total connections
              </span>
            </div>
            <Link
              to="/"
              className={`flex items-center gap-2 text-xs font-extrabold text-[#172033] transition hover:text-[#b84432] ${focusRing}`}
            >
              Discover people <ArrowIcon />
            </Link>
          </div>
        </header>

        <div className="mb-6 flex flex-col items-stretch justify-between gap-3 border-b border-[#cfd5dc] pb-4 sm:flex-row sm:items-center">
          <label
            className={`flex w-full max-w-[370px] items-center gap-3 rounded-full border border-[#cfd5dc] bg-white px-4 py-3 focus-within:border-[#b84432] focus-within:ring-3 focus-within:ring-[#b84432]/15 ${focusRing}`}
          >
            <span className={mutedText}>
              <SearchIcon />
            </span>
            <span className="sr-only">Search connections</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search your connections"
              className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#596575]"
            />
          </label>
          <span className={`text-xs font-bold ${mutedText}`}>
            {visibleConnections.length}{" "}
            {visibleConnections.length === 1 ? "person" : "people"}
          </span>
        </div>

        {visibleConnections.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleConnections.map((each, index) => (
              <article
                key={each?._id}
                className={`animate-[connection-card-in_.45s_both] overflow-hidden rounded-[1.15rem] border border-[#cfd5dc] bg-white shadow-[0_8px_24px_rgba(23,32,51,.055)] transition hover:-translate-y-1 hover:border-[#f3c7a4] hover:shadow-[0_18px_35px_rgba(23,32,51,.12)] ${index % 3 === 1 ? "[&>div:first-child]:bg-[#b9d2ed] hover:border-[#b9d2ed]" : index % 3 === 2 ? "[&>div:first-child]:bg-[#e7b5b0] hover:border-[#e7b5b0]" : ""}`}
              >
                <div className="h-1 bg-[#f3c7a4]" />
                <div className="flex min-h-[292px] flex-col p-[1.35rem]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[1.15rem] border-4 border-white bg-[#f7ded0] text-lg font-extrabold text-[#b84432] shadow-[0_4px_12px_rgba(23,32,51,.13)]">
                      {each?.photoUrl ? (
                        <img
                          src={each.photoUrl}
                          alt={`${each?.firstName}'s avatar`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {getInitials(each?.firstName, each?.lastName)}
                        </span>
                      )}
                    </div>
                    <span className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-[.68rem] font-extrabold text-[#234f82]">
                      Connected
                    </span>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-[1.2rem] font-extrabold text-[#172033]">
                      {each?.firstName} {each?.lastName}
                    </h2>
                    <div
                      className={`mt-1 flex items-center gap-2 text-xs ${mutedText}`}
                    >
                      {each?.age && <span>{each.age} years</span>}
                      {each?.age && each?.gender && (
                        <i
                          className="h-[3px] w-[3px] rounded-full bg-[#718092]"
                          aria-hidden="true"
                        />
                      )}
                      {each?.gender && <span>{each.gender}</span>}
                    </div>
                    <p
                      className={`mt-4 line-clamp-3 text-sm leading-relaxed ${mutedText}`}
                    >
                      {each?.about || "Ready to connect and share ideas."}
                    </p>
                  </div>
                  <Link
                    to={`/chat/${each?._id}`}
                    className={`mt-auto flex items-center justify-center gap-2 rounded-[.7rem] bg-[#172033] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#b84432] ${focusRing}`}
                  >
                    <ChatIcon />
                    <span>Start a chat</span>
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
            <h2 className="text-[1.7rem] font-extrabold">
              No connections found
            </h2>
            <p className={`mt-1 ${mutedText}`}>
              Try a different name or clear your search.
            </p>
          </div>
        )}

        <footer
          className={`mt-10 flex flex-col gap-2 border-t border-[#cfd5dc] pt-4 text-xs font-bold uppercase tracking-[.04em] sm:flex-row sm:justify-between ${mutedText}`}
        >
          <span>CodeBuddy network</span>
          <span>
            Showing {visibleConnections.length} of {connections.length}
          </span>
        </footer>
      </div>
    </div>
  );
};
