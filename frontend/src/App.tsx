import { useEffect } from "react";
import httpClient from "./Config/httpClient";
import { useState } from "react";
import Todo from "./Components/Todo";
import { ApiError, getError } from "./utils";
export type task = { _id: string; task: string };

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  let isMounted = true;

  // get all tasks
  useEffect(() => {
    const FetchTodos = async () => {
      try {
        setloading(true);
        const response = await httpClient.get("/api/task");
        setTasks(response.data.tasks);
        setloading(false);
      } catch (error) {
        console.log(getError(error as ApiError));
        setloading(false);
      }
    };
    if (isMounted) {
      FetchTodos();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Add tasks
  // const addtask = async () => {
  //   try {
  //     // const response;
  //   } catch (error) {}
  // };

  return (
    <>
      <div className="cont">
        <h1>To Dos</h1>
        <form className="top">
          <input
            type="text"
            value={task}
            placeholder="Add todos"
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {loading ? (
          <div className=" center-screen">
            <div className="spinner-border "></div>
          </div>
        ) : tasks.length > 0 ? (
          <div>
            {tasks.map((task: task) => (
              <Todo task={task} key={task._id} />
            ))}
          </div>
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </>
  );
}

export default App;
