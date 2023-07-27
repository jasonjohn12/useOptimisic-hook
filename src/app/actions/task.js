"use server";
import { revalidateTag } from "next/cache";

export async function createTask(task) {
  const newTask = {
    task,
    completed: false,
  };
  await fetch("http://localhost:8000/tasks", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(newTask),
    headers: {
      "Content-type": "application/json",
    },
  });

  revalidateTag("tasks");
}
