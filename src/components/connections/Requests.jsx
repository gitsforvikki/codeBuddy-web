import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConnectionRequest,
  reviewRequest,
} from "../../utils/connections/connectionReducer";
import { Link } from "react-router-dom";

export const RequestPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConnectionRequest());
  }, [dispatch]);

  const { requests, loading, error } = useSelector((state) => state.connection);

  const handleAccept = ({ status, requestId }) => {
    dispatch(reviewRequest({ status, requestId }));
  };

  const handleReject = ({ status, requestId }) => {
    dispatch(reviewRequest({ status, requestId }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  // Error state
  if (error || !requests) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="alert alert-error max-w-2xl mx-auto">
          <svg
            className="stroke-current shrink-0 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9.002 9.002 0 1020.92 17.53M7.08 6.47l-.9-.9A11.968 11.968 0 0120.92 17.53m0 0l.9.9M9 12a3 3 0 116 0 3 3 0 01-6 0z"
            ></path>
          </svg>
          <span>
            Something went wrong while loading requests. Please try again later.
          </span>
        </div>
      </div>
    );
  }
  // Empty state
  if (requests?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="text-6xl">📭</div>
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            No Connection Requests
          </h2>
          <p className="text-base-content/70 text-center max-w-md">
            You don't have any pending connection requests right now. Start
            making connections from the feed!
          </p>
          <Link to="/" className="btn btn-primary mt-4">
            Explore Feed
          </Link>
        </div>
      </div>
    );
  }
  // Main Requests View
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          📥 Connection Requests
        </h1>
        <p className="text-base-content/70 text-sm md:text-base">
          {requests.length} {requests.length === 1 ? "request" : "requests"}{" "}
          pending
        </p>
      </div>

      {/* Requests List */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 max-w-3xl">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, photoUrl, gender, about } =
            request.fromUserId || {};

          return (
            <div
              key={_id}
              className="card bg-base-300 shadow-md hover:shadow-lg transition-all"
            >
              <div className="card-body p-4 md:p-6">
                {/* Header with photo and basic info */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="avatar shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl ring-2 ring-primary ring-offset-2">
                      <img
                        src={photoUrl}
                        alt={`${firstName}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <h3 className="text-xl md:text-2xl font-bold truncate">
                      {firstName} {lastName}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {age && (
                        <span className="badge badge-sm md:badge-md">
                          🎂 {age} yrs
                        </span>
                      )}
                      {gender && (
                        <span className="badge badge-sm md:badge-md badge-outline">
                          {gender === "Male"
                            ? "👨"
                            : gender === "Female"
                              ? "👩"
                              : "🧑"}{" "}
                          {gender}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* About section */}
                {about && (
                  <div className="my-3">
                    <p className="text-sm md:text-base text-base-content/80 line-clamp-2">
                      "{about}"
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="card-actions justify-end gap-2 mt-4 pt-4 border-t border-base-200 flex-wrap">
                  <button
                    className="btn btn-outline btn-error btn-sm md:btn-md flex-1 sm:flex-none"
                    onClick={() =>
                      handleReject({
                        status: "rejected",
                        requestId: request._id,
                      })
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reject
                  </button>
                  <button
                    className="btn btn-primary btn-sm md:btn-md flex-1 sm:flex-none"
                    onClick={() =>
                      handleAccept({
                        status: "accepted",
                        requestId: request._id,
                      })
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t border-base-300 text-center">
        <p className="text-sm md:text-base text-base-content/70">
          Showing {requests.length} request{requests.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};
