import { LogViewer } from "../components/LogViewer";
import { getLogBySlug } from "../lib/logRegistry";
import type { Route } from "./+types/log";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getLogBySlug(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.post.title} | Ashish` },
    { name: "description", content: `Engineering log: ${data.post.title}` },
  ];
}

export default function LogRoute() {
  return (
    <LogViewer />
  );
}
