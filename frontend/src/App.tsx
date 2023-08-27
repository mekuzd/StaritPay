import { useEffect } from "react";
import httpClient from "./Config/httpClient";
import { useState } from "react";
import Todo from "./Components/Todo";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "./utils";
import { task } from "./Types/Task";
import { ApiError } from "./Types/ApiError";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  let isMounted = true;

  // get all tasks handler
  const FetchTodos = async () => {
    try {
      setloading(true);
      const response = await httpClient.get("/api/task");
      setTasks(response.data.tasks);
      setloading(false);
    } catch (error) {
      toast.error(getError(error as ApiError));
      setloading(false);
    }
  };
  useEffect(() => {
    if (isMounted) {
      FetchTodos();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Add tasks handler
  const addtask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task) {
      toast.error(" please fill input field ");
      return;
    }
    try {
      const response = await httpClient.post("/api/task", { task });
      toast.success(response.data.message);
      setTask("");
      FetchTodos();
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="cont">
        <h1>To Dos</h1>
        <form className="top">
          <input
            type="text"
            value={task}
            placeholder="Add todos"
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" onClick={addtask}>
            Add
          </button>
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
