import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConnectionRequest,
  reviewRequest,
} from "../../utils/connections/connectionReducer";

export const RequestPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConnectionRequest());
  }, [dispatch]);

  const { requests, loading, error, success } = useSelector(
    (state) => state.connection,
  );

  const handleAccept = ({ status, requestId }) => {
    dispatch(reviewRequest({ status, requestId }));
  };

  const handleReject = ({ status, requestId }) => {
    dispatch(reviewRequest({ status, requestId }));
  };

  if (!requests)
    return <h2 className="text-red-400 font-medium">Something went wrong</h2>;

  if (requests.length === 0) {
    return <h2 className="text-blue-500 font-medium">No requests found</h2>;
  }
  return (
    <>
      <div className="space-y-10 mb-24 mt-12">
        <h2 className="text-2xl font-semibold text-gray-300 text-center">
          Connection Requests
        </h2>

        <div className="flex flex-col items-center gap-y-3">
          {requests &&
            requests.map((request) => {
              const { _id, firstName, lastName, age, photoUrl, gender, about } =
                request.fromUserId || {};
              return (
                <div key={_id} className="w-1/2 bg-base-300 rounded p-4">
                  <div className="flex flex-col gap-y-3">
                    <div className="rounded-xl  w-full shadow-sm flex  gap-x-6">
                      <img
                        src={photoUrl}
                        alt="Photo"
                        className="rounded-2xl w-16 h-16"
                      />
                      <div className="">
                        <h2 className="card-title text-xl">
                          {firstName} {lastName}
                        </h2>
                        <div className="flex gap-x-1">
                          <h3>{age && <span>{age}yrs</span>}</h3>
                          <h3>{gender && <span>| {gender}</span>}</h3>
                        </div>
                      </div>
                    </div>
                    <p>{about}</p>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleReject({
                          status: "rejected",
                          requestId: request._id,
                        })
                      }
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleAccept({
                          status: "accepted",
                          requestId: request._id,
                        })
                      }
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
