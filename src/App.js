import Input from "./components/header/Input";
import TodosList from "./components/todo/TodosList";
import TodoProvider from "./store/TodoContext";


function App() {
 
  return (
    <TodoProvider>
      <Input />
      <TodosList />
     
    </TodoProvider>
  );
}

export default App;
