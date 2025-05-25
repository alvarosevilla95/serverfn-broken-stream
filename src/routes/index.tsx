import { createServerFn } from "@tanstack/react-start";

export const doWork = createServerFn({
  method: "POST",
}).handler(async ({ signal }) => {
  console.log("signal on start", signal.aborted);
  signal.onabort = () => {
    console.log("signal aborted");
  };
  // wait more to ensure signal has been aborted
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("signal before return", signal.aborted);
  return "hello";
});

export const Route = createFileRoute({
  component: Home,
});

const onClick = async () => {
  const controller = new AbortController();
  console.log("Calling serverfn");
  doWork({ signal: controller.signal });
  console.log("signal status", controller.signal.aborted);
  // wait a bit before aborting
  await new Promise((resolve) => setTimeout(resolve, 1000));
  controller.abort();
  console.log("signal status after abort", controller.signal.aborted);
};

function Home() {
  return (
    <div className="p-2">
      <button onClick={onClick}>Trigger function</button>
    </div>
  );
}
