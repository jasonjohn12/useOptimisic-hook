"use client";
import { experimental_useOptimistic as useOptimisic, useRef } from "react";
import { createTask } from "@/app/actions/task";
const Tasks = ({ tasks }) => {
  const [optimisticTasks, addOptimisticTask] = useOptimisic(
    tasks,
    (state, newTask) => [...state, { task: newTask, completed: false }]
  );
  const formRef = useRef();
  return (
    <div>
      <form
        action={async (formData) => {
          const task = formData.get("task");
          formRef.current.reset();
          addOptimisticTask(task);
          await createTask(task);
        }}
        ref={formRef}
      >
        <input
          placeholder="Add Task"
          className="bg-slate-800 w-full placeholder:text-center my-6 rounded-md h-8 outline-none"
          type="text"
          name="task"
        />
      </form>
      <ul>
        {optimisticTasks.map((task) => (
          <li
            className="flex justify-between min-w-800 container mx-auto "
            key={task.id}
          >
            <p>{task.task}</p>
            <span>{task.completed.toString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
