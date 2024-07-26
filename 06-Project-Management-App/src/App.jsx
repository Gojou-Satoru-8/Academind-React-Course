import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Project from "./components/Project";

function App() {
  const [stateOfProjects, setStateofProject] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const saveButtonElement = useRef();

  const handleStartAddProject = function (e) {
    setStateofProject((currentState) => ({ ...currentState, selectedProjectId: null }));
  };

  const cancelAddProject = function (e) {
    setStateofProject((currentState) => ({ ...currentState, selectedProjectId: undefined }));
  };

  const handleSelectProject = function (id) {
    setStateofProject((currentState) => ({ ...currentState, selectedProjectId: id }));
  };

  const saveNewProject = function (e) {
    setStateofProject((currentState) => {
      const newProject = saveButtonElement.current.getLastSavedProject();
      if (newProject) {
        const newId = currentState.projects.length + 1;
        return {
          ...currentState,
          selectedProjectId: newId,
          projects: [...currentState.projects, { id: newId, ...newProject }],
        };
      } else {
        // newProject has been returned a value of undefined;  modal shown with errors
        return structuredClone(currentState);
      }
    });
  };

  const handledeleteProject = function (id) {
    setStateofProject((currentState) => ({
      ...currentState,
      selectedProjectId: undefined,
      projects: currentState.projects.filter((project) => project.id !== id),
      // projects: currentState.projects.filter((project) => project.id !== currentState.selectedProjectId),
      // NOTE: Both work since the delete button is part of the Project component, on selecting a project
      // sets the selectedProjectId to its project id.
    }));
  };

  const handleAddTask = function (taskText) {
    setStateofProject((currentState) => {
      const taskId = Math.round(Math.random() * 10000);
      const newTask = {
        id: taskId,
        text: taskText,
        project: currentState.selectedProjectId,
      };

      return {
        ...currentState,
        tasks: [newTask, ...currentState.tasks],
      };
    });
  };
  const handleDeleteTask = function (taskId) {
    setStateofProject((currentState) => {
      return { ...currentState, tasks: currentState.tasks.filter((task) => task.id !== taskId) };
    });
  };

  console.log(stateOfProjects.projects);
  console.log("---------------");
  const selectedProject = stateOfProjects.projects.find((project) => stateOfProjects.selectedProjectId === project.id);
  let mainContent = (
    <Project
      project={selectedProject}
      onDeleteProject={handledeleteProject}
      tasks={stateOfProjects.tasks}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );
  if (stateOfProjects.selectedProjectId === null)
    mainContent = <NewProject onCancel={cancelAddProject} ref={saveButtonElement} onSave={saveNewProject} />;
  else if (stateOfProjects.selectedProjectId === undefined)
    mainContent = <NoProjectSelected onProjectAdd={handleStartAddProject}></NoProjectSelected>;
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onProjectAdd={handleStartAddProject}
        projects={stateOfProjects.projects}
        onProjectSelect={handleSelectProject}
        selectedProjectId={stateOfProjects.selectedProjectId}
      />
      {mainContent}
    </main>
  );
}

export default App;
