import { FilterBar } from "@/components/filterBar/filterBar.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/components/task/task.jsx";
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar.jsx";
import { TasksCounter } from "@/components/tasksCounter/tasksCounter.jsx";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook.js";
import { useState } from "react";

function DisplaySkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-12">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
    </div>
  );
}

export default function Tasks() {
  const [order, ] = useState("asc");
  const [limit,] = useState(5);
  const [page, ] = useState(1);

  const { data, } = useFetchTasks({
    order,
    limit,
    page,
  });

  console.log(data);
  return (
    <section className="flex flex-row w-full p-4 gap-8">
      <section className="flex basis-2/3 justify-center ">
        <div className="flex flex-col w-4/5 p-4 items-center">
          <h1 className="text-white font-bold text-2xl mb-8 w-full">
            Tasks as on: Wednesday, 1 Jan 2025
          </h1>
          <div className="w-11/12 flex flex-col">
            <div className="flex justify-between mb-16">
              <TasksCounter count={12} type="todo" />
              <TasksCounter count={4} type="inProgress" />
              <TasksCounter count={10} type="completed" />
            </div>

            <FilterBar />

            {!data &&
              [...Array(limit)].map((entry, index) => (
                <DisplaySkeleton key={`${index}skel`} />
              ))}

            {data &&
              data.data.map((task) => (
                <Task
                  key={task["_id"]}
                  dueDate={new Date(task.dueDate)}
                  description={task.description}
                  status={task.status}
                  priority={task.priority}
                  title={task.title}
                  id={task["_id"]}
                />
              ))}
          </div>
        </div>
      </section>
      <TaskSidebar />
    </section>
  );
}
