import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { task } from "../App";

const Todo = ({ task }: { task: task }) => {
  return (
    <div className="todo">
      <div>
        <h5>{task.task}</h5>
      </div>
      <div className="icons">
        <FaEdit className="icon" />
        <AiFillDelete className="icon" />
      </div>
    </div>
  );
};
export default Todo;
