import Tasks from "./tasks";
export default async function Home() {
  const res = await fetch("http://localhost:8000/tasks", {
    cache: "no-cache",
    next: {
      tags: ["tasks"],
    },
  });

  const tasks = await res.json();

  return (
    <div className="flex justify-center my-12">
      <div>
        <h1 className="text-center">Use Optimisic</h1>

        <Tasks tasks={tasks} />
      </div>
    </div>
  );
}
