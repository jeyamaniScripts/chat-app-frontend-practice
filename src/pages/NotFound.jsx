import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>

      <p className="text-xl font-semibold text-slate-700 mt-4">
        Page not found
      </p>

      <p className="text-slate-500 mt-2 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg
                   hover:bg-indigo-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
