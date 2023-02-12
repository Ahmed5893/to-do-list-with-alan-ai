import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../store/TodoContext";
import Pagination from "../utilities/Pagination";
import Todo from "./Todo";
import alanBtn from "@alan-ai/alan-sdk-web";
import classes from "./Todo.module.css";

const TodosList = () => {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);
  const [todosPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  // Get current posts
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodo = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    alanBtn({
      key: "21fdb362d25080992220db42caa44f712e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log("first", commandData);

        switch (commandData.command) {
          case "ADD":
            dispatch({ type: "ADD", task: commandData.data.toString() });
            break;
          case "REMOVE":
            const index = todos.findIndex(
              (el) => el.task === commandData.data.toString()
            );
            const id = todos[index].id;
            dispatch({ type: "REMOVE", id: id });
            break;
          case "EDIT":
            const i = todos.findIndex(
              (el) => el.task === commandData.data.item.toString()
            );
            console.log(i, "read that");
            const x = todos[i].id;
            const newItem=commandData.data.new.toString()
           console.log('item', newItem);
            dispatch({
              type: "EDIT",id:x,taskModified:newItem});
            break;
          default:
            break;
        }
      },
    });
  }, [dispatch, todos]);
  return (
    <div className={classes.list}>
      {currentTodo.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
      <Pagination
        todoPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
      />
    </div>
  );
};

export default TodosList;
