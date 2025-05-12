import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const fetchStream = createServerFn({
  method: "POST",
  response: "raw",
}).handler(async () => {
  const messages = ["first", "second", "third"];
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let index = 0;

      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(`${messages[index++]}\n`));
        if (index === messages.length) {
          clearInterval(interval);
          controller.close();
        }
      }, 1_000);
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
});

export const Route = createFileRoute("/")({
  component: Home,
});

const onClick = async () => {
  console.log("req");
  const res = await fetchStream();
  console.log("res status:", res.status);
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log("chunk", decoder.decode(value));
  }
  console.log("stream closed");
};

function Home() {
  return (
    <div className="p-2">
      <button onClick={onClick}>Fetch Stream</button>
    </div>
  );
}
