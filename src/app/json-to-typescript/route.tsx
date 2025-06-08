import JSONToTypescriptPage from "./page";
import type { RouteObject } from "react-router-dom";

export default {
  path: "json-to-typescript",
  element: <JSONToTypescriptPage />,
} as const satisfies RouteObject;
