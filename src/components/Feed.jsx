import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, sendRequest } from "../utils/connections/connectionReducer";
import { FeedCard } from "./cards/FeedCard";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.connection);
  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!feed) return null;
  if (feed?.length <= 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <div className="text-7xl md:text-8xl">🎯</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            You've Reviewed Everyone!
          </h1>
          <p className="text-base md:text-lg text-base-content/70 text-center max-w-lg">
            No new profiles available at the moment. Check back soon for more
            developers to connect with!
          </p>
          <div className="mt-6 space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row">
            <button
              onClick={() => dispatch(getFeed())}
              className="btn btn-primary btn-lg"
            >
              Refresh Feed
            </button>
            <button className="btn btn-outline btn-lg">View Connections</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      {/* header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          🌟 Discover Developers
        </h1>
        <p className="text-base-content/70 text-sm md:text-base">
          Find your next connection or collaborator
        </p>
      </div>

      <div className="flex justify-center  mt-24">
        <div className="flex justify-center items-center">
          {feed && feed.length > 0 && (
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
              <FeedCard
                key={feed[0]._id}
                user={feed[0]}
                onInterested={() =>
                  dispatch(
                    sendRequest({
                      status: "interested",
                      requestId: feed[0]._id,
                    }),
                  )
                }
                onIgnored={() =>
                  dispatch(
                    sendRequest({
                      status: "interested",
                      requestId: feed[0]._id,
                    }),
                  )
                }
              />

              {/* Progress Indicator */}
              <div className="text-center mt-6">
                <p className="text-xs md:text-sm text-base-content/60">
                  Profile 1 of {feed.length} available
                </p>
                <div className="mt-2 w-full bg-base-300 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(1 / feed.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="card bg-base-300 shadow-md">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">💼</div>
            <h3 className="card-title text-lg">Professional Network</h3>
            <p className="text-sm text-base-content/70">
              Connect with developers from around the world
            </p>
          </div>
        </div>

        <div className="card bg-base-300 shadow-md">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">🤝</div>
            <h3 className="card-title text-lg">Real Connections</h3>
            <p className="text-sm text-base-content/70">
              Build meaningful relationships with like-minded professionals
            </p>
          </div>
        </div>

        <div className="card bg-base-300 shadow-md">
          <div className="card-body items-center text-center">
            <div className="text-4xl mb-2">💬</div>
            <h3 className="card-title text-lg">Easy Chat</h3>
            <p className="text-sm text-base-content/70">
              Start conversations instantly with accepted connections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
