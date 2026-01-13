import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return <h1>{error.status || 404} – Something went wrong</h1>;
};
