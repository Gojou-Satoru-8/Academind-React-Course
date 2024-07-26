import Tasks from "./Tasks";

const Project = function ({ project, onDeleteProject, tasks, onAddTask, onDeleteTask }) {
  const isoDate = new Date(project.dueDate).toISOString().split("T").at(0);
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button
            type="button"
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDeleteProject(project.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{isoDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks tasks={tasks} onAddTask={onAddTask} onDeleteTask={onDeleteTask} />
    </div>
  );
};

export default Project;
