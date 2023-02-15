import { useState, useContext } from "react";
import { TodoContext } from "../../store/TodoContext";
import ErrorAlert from "../utilities/ErrorAlert";
import classes from "./Input.module.css";
import {BsQuestionCircle} from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = () => {
  const [input, setInput] = useState("");
  const [showInfo, setShowInfo] = useState(null);

  const [alert, setAlert] = useState(false);
  const {  dispatch } = useContext(TodoContext);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input) {
      dispatch({ type: "ADD", task: input });
      setInput("");
    } else {
      setAlert(true);
    }
  };



  return (
    <div className={classes.header}>
      <h1 className={classes.title}>To Do List</h1>
   
      <BsQuestionCircle className={classes.icon} onClick={()=>{setShowInfo(true);toast.success('Click on the microphone button and Say:How to use the app')}}/>
     
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="What We Have For Today"
          value={input}
          onChange={(e) => {setInput(e.target.value);setAlert(false)}}
        />
        <input type="submit" value="Add Your todo" />
      </form>
      {alert && <ErrorAlert message='Can Not Add An Empty Field' />}
{showInfo &&       <ToastContainer position="bottom-center" limit={1} />
}
    </div>
  );
};

export default Input;
