import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import httpClient from "../Config/httpClient";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../Types/ApiError";
import { task } from "../Types/Task";

type todoComponentProps = {
  task: task;
  setId: (id: string) => void;
  setTask: (task: string) => void;
  setShowUpdateBtn: (showUpdateBtn: boolean) => void;
  fetchTodos: () => void;
};

const Todo: React.FC<todoComponentProps> = ({
  task,
  setId,
  setTask,
  setShowUpdateBtn,
  fetchTodos,
}) => {
  // handleEdit
  function handleSetId(id: string, task: string) {
    setId(id);
    setTask(task);
    setShowUpdateBtn(true);
  }

  // delete tasks handler
  const deleteTask = async (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    try {
      const response = await httpClient.delete(`/api/task/${id}`);
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  return (
    <div className="todo">
      <div>{task.task}</div>
      <div className="d-flex justify-content-between align-items-center">
        <span onClick={() => handleSetId(task._id, task.task)}>
          <FaEdit className="icon" />
        </span>
        <span className="mx-3" onClick={(e) => deleteTask(e, task._id)}>
          {" "}
          <AiFillDelete className="icon" />
        </span>
      </div>
    </div>
  );
};
export default Todo;
