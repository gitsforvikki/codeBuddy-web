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
      <div>
        {feed &&
          feed.map((user) => (
            <FeedCard
              key={user._id}
              user={user}
              // handleRequestSent={() =>
              //   handleRequestSent({
              //     status: "interested",
              //     requestId: user._id,
              //   })
              // }
              onInterested={() =>
                dispatch(
                  sendRequest({
                    status: "interested",
                    requestId: user._id,
                  })
                )
              }
              // handleRequestIngored={() =>
              //   handleRequestIngored({
              //     status: "ignored",
              //     requestId: user._id,
              //   })
              // }
              onIgnored={() =>
                dispatch(
                  sendRequest({
                    status: "interested",
                    requestId: user._id,
                  })
                )
              }
            />
          ))}
      </div>
    </>
  );
};
