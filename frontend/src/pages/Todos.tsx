import { useContext, useEffect } from "react";
import httpClient from "../Config/httpClient";
import { useState } from "react";
import Todo from "../Components/Todo";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../utils";
import { task } from "../Types/Task";
import { ApiError } from "../Types/ApiError";
import { toast } from "react-toastify";
import { Store } from "../Provider/Store";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [showUpdateBtn, setShowUpdateBtn] = useState<boolean>(false);
  const [id, SetId] = useState<string>("");
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;
  let isMounted = true;

  // get all tasks handler
  const fetchTodos = async () => {
    try {
      const response = await httpClient.get("/api/task");
      setTasks(response.data.tasks);
      setloading(false);
    } catch (error) {
      toast.error(getError(error as ApiError));
      setloading(false);
    }
  };

  // load Todos
  useEffect(() => {
    if (isMounted) {
      fetchTodos();
      setloading(true);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin/?redirect=/todos");
    }
  }, [userInfo, navigate]);
  // Add tasks handler
  const addTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task) {
      toast.error(" please fill input field ");
      return;
    }
    setTasks([...tasks, { task: task, _id: String(Date.now()) }]); // virtual addition before db response
    setTask("");
    try {
      const response = await httpClient.post("/api/task", { task });
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  // update tasks handler
  const updateTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task) {
      toast.error(" please fill input field ");
      return;
    }
    //virtual update  before db response
    const Tasks = tasks.map((tasks) => {
      if (tasks._id == id) {
        return { ...tasks, task: task };
      } else {
        return tasks;
      }
    });
    setTasks(Tasks);
    setTask("");

    try {
      const response = await httpClient.patch(`/api/task/${id}`, { task });
      toast.success(response.data.message);
      fetchTodos();
      setShowUpdateBtn(false);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

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
          {showUpdateBtn ? (
            <button type="submit" onClick={updateTask}>
              Update
            </button>
          ) : (
            <button type="submit" onClick={addTask}>
              Add
            </button>
          )}
        </form>
        {loading ? (
          <div className=" center-screen">
            <div className="spinner-border "></div>
          </div>
        ) : tasks.length > 0 ? (
          <div>
            {tasks.map((task: task) => (
              <Todo
                task={task}
                key={task._id}
                setId={SetId}
                setTask={setTask}
                setShowUpdateBtn={setShowUpdateBtn}
                fetchTodos={fetchTodos}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))}
          </div>
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </>
  );
};
export default Todos;
