import { useEffect } from "react";
import httpClient from "./Config/httpClient";
import { useState } from "react";
import Todo from "./Components/Todo";
export type task = { _id: string; task: string };

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  let isMounted = true;

  useEffect(() => {
    const FetchTodos = async () => {
      try {
        setloading(true);
        const response = await httpClient.get("/api/task");
        setTasks(response.data.tasks);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (isMounted) {
      FetchTodos();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="cont">
        <h1>To Dos</h1>
        <form className="top">
          <input type="text" placeholder="Add todos" />
          <button type="submit">Add</button>
        </form>
        {loading ? (
          <div className=" center-screen">
            <div className="spinner-border "></div>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <Todo task={task} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
