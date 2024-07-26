import { useState } from "react";

const NewTask = function ({ onAddTask }) {
  const [taskInput, setTaskInput] = useState("");

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleClick = () => {
    if (taskInput.trim() === "") return;
    // Call onAddTask function from App.jsx available through multiple layers of prop-drilling
    onAddTask(taskInput);
    setTaskInput("");
  };

  return (
    <div className="flex items-center gap-4">
      <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" value={taskInput} onChange={handleChange} />
      <button type="button" className="text-stone-700 hover:text-stone-950" onClick={handleClick}>
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
