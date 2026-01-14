import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <EditProfile user={user} />
    </>
  );
};
