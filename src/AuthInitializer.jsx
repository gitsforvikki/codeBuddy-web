import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./utils/userSlice/userReducer";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile()); 
  }, [dispatch]);

  return null;
}
