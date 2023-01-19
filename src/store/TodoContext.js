import React, { useEffect } from "react";
import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const TodoProvider = (props) => {
  const localData = localStorage.getItem("todos");

  const initialState = {
    todos: localData ? JSON.parse(localData) : [],
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        const id = Math.random().toString(16);
        const newTodo = {
          id: id,
          task: action.task,
          reminder: false,
          isDone: false,
        };

        return {
          ...state,
          todos: [...state.todos, newTodo],
        };

      case "REMOVE":
        return {
          ...state,
          todos: state.todos.filter((el) => el.id !== action.id),
        };

      case "EDIT":
        return {
          ...state,
          todos: state.todos.map((el) =>
            el.id === action.id ? { ...el, task: action.taskModified } : el
          ),
        };

      case "IS_COMPLETE":
        return {
          ...state,
          todos: state.todos.map((el) =>
            el.id === action.id ? { ...el, isDone: !el.isDone } : el
          ),
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
