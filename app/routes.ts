import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("log/:slug", "routes/log.tsx"),
  route("blog", "routes/blog.tsx"),
  route("projects", "routes/projects.tsx"),
  route("uses", "routes/uses.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
