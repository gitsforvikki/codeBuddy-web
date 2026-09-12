import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";
import { ProfileShimmer } from "../simmerUi/ShimmerUi";

export const Profile = () => {
  const { user, loading, error, success } = useSelector((state) => state.user);
  if (!user) return <ProfileShimmer />;

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
