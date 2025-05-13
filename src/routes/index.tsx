export const Route = createFileRoute({
  beforeLoad: () => {
    console.log("beforeLoad");
    throw new Error("throwing before");
    return { hello: "world" };
  },
  loader: ({ context: { hello } }) => {
    console.log("loader: hello", hello);
    // throw new Error("throwing");
    return { hello };
  },
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  return (
    <div className="p-2">
      <div>Hello {data?.hello}</div>
    </div>
  );
}
