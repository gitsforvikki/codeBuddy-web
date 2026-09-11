import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./redux/users/userReducer";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return null;
}
