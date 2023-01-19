import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { Slide } from "react-awesome-reveal";
import { TodoContext } from "../../store/TodoContext";
import classes from "./Todo.module.css";
import ErrorAlert from "../utilities/ErrorAlert";

const Todo = ({ todo }) => {
  const [taskModified, setTaskModified] = useState(todo.task);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(false);

  const { dispatch } = useContext(TodoContext);
  const handleDelete = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };
  const handleEdit = (id) => {
    if (taskModified) {
      dispatch({ type: "EDIT", id: id, taskModified: taskModified });
      setEdit(false);
    } else {
      setAlert(true);
    }
  };
  const isComplete = (id) => {
    dispatch({ type: "IS_COMPLETE", id: id });
  };
  return (
    <Slide direction="up">
      <div
        className={`${classes["todo-container"]} ${
          todo.isDone ? classes.complete : ""
        }`}
        onDoubleClick={() => isComplete(todo.id)}
      >
        <input
          className={classes.edit}
          type="text"
          disabled={edit ? false : true}
          value={edit ? taskModified : todo.task}
          onChange={(e) => {
            setTaskModified(e.target.value);
            setAlert(false);
          }}
        />
        <div className={classes["todo-btn"]}>
          <button className={classes["btn-edit"]}>
            {edit ? (
              <AiOutlineCheckSquare
                onClick={() => handleEdit(todo.id)}
                className={classes.check}
              />
            ) : (
              <FiEdit onClick={() => setEdit(true)} />
            )}
          </button>
          <button className="btn-delete">
            <RiDeleteBin5Line onClick={() => handleDelete(todo.id)} />
          </button>
        </div>
      </div>
      {alert && <ErrorAlert message="Can Not Add An Empty Field" />}
    </Slide>
  );
};

export default Todo;
