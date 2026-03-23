import React, { useState } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if(task.trim() === "") return;

    setTasks([...tasks, {text: task, completed: false}]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((t,i)=> i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">

      <h1>Dynamic Task List</h1>

      <div className="inputBox">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e)=>setTask(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <div className="taskList">
        {tasks.map((t,index)=>(
          <div className="taskCard" key={index}>

            <input
              type="checkbox"
              onChange={()=>toggleComplete(index)}
            />

            <span className={t.completed ? "completed" : ""}>
              {t.text}
            </span>

            <button className="deleteBtn"
              onClick={()=>deleteTask(index)}>
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;