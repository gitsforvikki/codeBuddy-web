import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConnection } from "../../utils/connections/connectionReducer";

export const Connections = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConnection());
  }, [dispatch]);
  const { connections, loading, error, success } = useSelector(
    (state) => state.connection
  );
  return (
    <>
      <h2 className="text-4xl font-semibold text-fuchsia-600">Connections</h2>
      <div className="flex flex-col gap-y-4 items-center">
        {connections &&
          connections.map((each) => {
            return (
              <div key={each._id} className="w-1/2">
                <div className="rounded-xl bg-base-300 w-full shadow-sm flex p-1">
                  <div className="">
                    <img src={each.photoUrl} alt="Photo" className="rounded-2xl w-16 h-16" />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title text-xl">
                      {each.firstName} {each.lastName}
                    </h2>
                    <div className="flex gap-x-1">
                      <h3>{each.age && <span>{each.age}yrs</span>}</h3>
                      <h3>{each.gender && <span>| {each.gender}</span>}</h3>
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-secondary">Chat</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
