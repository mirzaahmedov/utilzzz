import { Navigate, createBrowserRouter } from "react-router-dom";

import JSONToTypescriptRoute from "./json-to-typescript/route";
import MainLayout from "./__layout__/main";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <MainLayout />,
    children: [
      JSONToTypescriptRoute,
      {
        path: "*",
        element: <Navigate to={JSONToTypescriptRoute.path} />,
      },
    ],
  },
]);
