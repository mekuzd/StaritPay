import { useContext, useEffect, useRef } from "react";
import httpClient from "../Config/httpClient";
import { useState } from "react";
import Todo from "../Components/Todo";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../utils";
import { task } from "../Types/Task";
import { ApiError } from "../Types/ApiError";
import { Store } from "../Provider/Store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import NavbarComp from "../Components/Navbar";

const Todos = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [showUpdateBtn, setShowUpdateBtn] = useState<boolean>(false);
  const [id, SetId] = useState<string>("");
  const inp = useRef<any>(null);
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  let isMounted = true;
  useEffect(() => {
    inp.current.focus();
  });
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

  useEffect(() => {
    if (!userInfo) {
      return navigate("/signin/?redirect=/todos");
    }
  }, [userInfo]);

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

  // Add tasks handler
  const addTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task) {
      toast.error(" please fill input field ");
      return;
    }
    setTasks([...tasks, { task: task, _id: String(Date.now()) }]); // virtual addition before db response
    setTask("");
    toast.success("task created");

    try {
      await httpClient.post("/api/task", { task });
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
    //virtual update before db response
    const Tasks = tasks.map((tasks) => {
      if (tasks._id == id) {
        return { ...tasks, task: task };
      } else {
        return tasks;
      }
    });
    setTasks(Tasks);
    setTask("");
    setShowUpdateBtn(false);
    toast.success("task updated successfully");

    try {
      await httpClient.patch(`/api/task/${id}`, { task });
      fetchTodos();
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  return (
    <>
      <ToastContainer position="top-right" limit={1} />
      <NavbarComp />
      <div className="cont">
        <h1 className="my-4">To Do App </h1>
        <form className="top">
          <input
            ref={inp}
            type="text"
            value={task}
            placeholder="Add todos"
            onChange={(e) => setTask(e.target.value)}
          />
          {showUpdateBtn ? (
            <button type="submit" className="btn btn-dark" onClick={updateTask}>
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-dark" onClick={addTask}>
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
