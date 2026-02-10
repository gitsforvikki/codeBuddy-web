import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConnection } from "../../utils/connections/connectionReducer";
import { Link } from "react-router-dom";

export const Connections = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConnection());
  }, [dispatch]);
  const { connections, loading, error } = useSelector(
    (state) => state.connection,
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="alert alert-error max-w-2xl mx-auto">
          <span>Error loading connections: {error}</span>
        </div>
      </div>
    );
  }

  if (!connections || connections?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="text-6xl">🤝</div>
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            No Connections Yet
          </h2>
          <p className="text-base-content/70 text-center max-w-md">
            Start making connections to see them here. Visit the feed to find
            interesting profiles!
          </p>
          <Link to="/" className="btn btn-primary mt-4">
            Explore Feed
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fuchsia-600 mb-2">
          🤝 Connections
        </h1>
        <p className="text-base-content/70 text-sm md:text-base">
          {connections?.length}{" "}
          {connections?.length === 1 ? "connection" : "connections"} found
        </p>
      </div>

      {/* Connections Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 max-w-3xl">
        {connections?.map((each) => {
          return (
            <div key={each?._id} className="w-full">
              <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="card-body p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {/* Avatar Section */}
                    <div className="avatar shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl ring-2 ring-primary ring-offset-2">
                        <img
                          src={each?.photoUrl}
                          alt={`${each?.firstName}'s avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 w-full">
                      <h2 className="card-title text-lg md:text-xl truncate">
                        {each?.firstName} {each?.lastName}
                      </h2>

                      <div className="flex flex-wrap gap-2 mt-2 mb-4">
                        {each?.age && (
                          <span className="badge badge-sm md:badge-md badge-primary">
                            🎂 {each?.age} yrs
                          </span>
                        )}
                        {each?.gender && (
                          <span className="badge badge-sm md:badge-md badge-outline">
                            {each?.gender === "Male"
                              ? "👨"
                              : each?.gender === "Female"
                                ? "👩"
                                : "🧑"}{" "}
                            {each?.gender}
                          </span>
                        )}
                      </div>

                      {each?.about && (
                        <p className="text-sm md:text-base text-base-content/80 line-clamp-2">
                          {each?.about}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                    <Link to={`/chat/${each?._id}`} className="w-full sm:w-auto">
                      <button className="btn btn-secondary btn-sm md:btn-md w-full sm:w-auto gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Start Chat</span>
                        <span className="sm:hidden">Chat</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t border-base-300 text-center">
        <p className="text-sm md:text-base text-base-content/70">
          Showing {connections?.length} connection
          {connections?.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};
