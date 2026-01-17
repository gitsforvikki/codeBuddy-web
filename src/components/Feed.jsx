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

  const handleRequestSent = ({ status, requestId }) => {
    dispatch(sendRequest({ status, requestId }));
  };

  const handleRequestIngored = ({ status, requestId }) => {
    dispatch(sendRequest({ status, requestId }));
  };
  return (
    <>
      <div className="flex justify-center  mt-24">
        {feed && (
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
        )}
      </div>
    </>
  );
};
