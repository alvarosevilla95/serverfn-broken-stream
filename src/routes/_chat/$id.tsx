import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_chat/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$id"!</div>;
}
