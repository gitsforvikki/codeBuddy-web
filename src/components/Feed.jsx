import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../utils/feed/feedReducer";
import { FeedCard } from "./cards/FeedCard";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.feed);
  useEffect(() => {
    dispatch(getFeed());
  }, []);

  return (
    <>
      <div>
        {feed && feed.map((user) => <FeedCard user={user} key={user._id} />)}
      </div>
    </>
  );
};
