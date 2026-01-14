import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-4xl font-extrabold flex items-center mb-2">
        {error.status || 404} –Oops! Resource not found.
      </h1>
      <Link to="/" className="text-blue-700">
        Back to Home
      </Link>
    </div>
  );
};
