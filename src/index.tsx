import * as React from "react";
import { Link } from "react-router-dom";
import type { PiletApi } from "aptitude-test";
import "./app.css";
import Dashboard from "./pages/Dashboard";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  app.registerPage("/dashboard", Dashboard);

  app.registerMenu(() => (
    <Link
      to="/dashboard"
      className="px-3 py-2 hover:text-gray-500 border !border-gray-800 rounded-2xl !bg-gray-200"
    >
      Dashboard
    </Link>
  ));
  const PostDetail = React.lazy(() => import("./pages/PostDetail"));
  app.registerPage("/dashboard/:id", () => (
    <React.Suspense fallback={<p className="p-6 text-secondary">Loading...</p>}>
      <PostDetail />
    </React.Suspense>
  ));
  // app.registerTile(() => <div>Welcome to Piral!</div>, {
  //   initialColumns: 2,
  //   initialRows: 2,
  // });
}
