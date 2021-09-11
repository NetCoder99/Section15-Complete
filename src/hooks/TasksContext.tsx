import React from "react";
import { useState } from "react";
import taskObj from "../models/taskObj";

type TasksContextObj = {

  status:   string;
    items:      taskObj[];
    setStatus:  (statusText: string) => void;
    setTasks:   (items: taskObj[])   => void;
    addTask:    (id: string, taskText:   string) => void;
    delTask:    (id:         string) => void;
    clearTasks: () => void;
  };

  export const TasksContext = React.createContext<TasksContextObj>({
    status: '',
    items: [],
    setStatus: (statusText: string) => {},
    setTasks:  (items: taskObj[])   => {},
    addTask:   (taskText: string) => {},
    delTask:   (id: string)       => {},
    clearTasks: () => {},
  });  

  const TasksContextProvider: React.FC = (props) => {
    console.log("TasksContextProvider.init");
    const [tasksList,    setTasksList]   = useState<taskObj[]>([]);
    const [statusText,   setStatusText]  = useState<string>("");
  
    const statusTextHandler = (statusText: string) => {
      console.log("TasksContextProvider.statusTextHandler:" + statusText);
      setStatusText(statusText);
    };
  
    const setTasksHandler = (items: taskObj[]) => {
      console.log("TasksContextProvider.setTasksHandler");
      setTasksList(items);
      //setStatusText("Tasks were added: " + items.length);
    };
    
    const onAddTaskHandler = (taskId: string, taskText: string) => {
      console.log("TasksContextProvider.onAddTaskHandler:" + taskText);
      const newTask = new taskObj(taskId, taskText);
      setTasksList((prevArray) => {
        return [...prevArray, newTask];
      });
      //setStatusText("Task was added: " + newTask.id);
    };
  
    const onDelTaskHandler = (taskId: string) => {
      console.log("TasksContextProvider.onDelTaskHandler:" + taskId);
      setTasksList(tasksList.filter((element) => element.id !== taskId));
      //setStatusText("Task was removed: " + taskId);
    };
  
    const onClearTasksHandler = () => {
      console.log("TasksContextProvider.onClearTasksHandler");
      setTasksList([]);
      //setStatusText("All tasks were removed");
    };

    const contextValue: TasksContextObj = {
      status: statusText,
      items: tasksList,
      setStatus: statusTextHandler,
      setTasks:  setTasksHandler,
      addTask: onAddTaskHandler,
      delTask: onDelTaskHandler,
      clearTasks: onClearTasksHandler,
    };
  
    return (
      <TasksContext.Provider value={contextValue}>
        {props.children}
      </TasksContext.Provider>
    );
  };
  
  export default TasksContextProvider;
