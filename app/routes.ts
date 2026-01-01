import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("log/:slug", "routes/log.tsx"),
] satisfies RouteConfig;
