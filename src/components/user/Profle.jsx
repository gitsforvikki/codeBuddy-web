import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
  const { user, loading, error, success } = useSelector((state) => state.user);
  return (
    <>
      <EditProfile
        user={user}
        error={error}
        loading={loading}
        success={success}
      />
    </>
  );
};
