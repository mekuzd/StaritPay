import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { task } from "../App";

const Todo = ({ task }: { task: task }) => {
  return (
    <div className="todo">
      <div>{task.task}</div>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          <FaEdit className="icon" />
        </span>
        <span className="mx-3">
          {" "}
          <AiFillDelete className="icon" />
        </span>
      </div>
    </div>
  );
};
export default Todo;
