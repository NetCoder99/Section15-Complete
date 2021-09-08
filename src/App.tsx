import React, { useEffect, useContext } from 'react';

import TasksList from './components/Tasks/TasksList';
import NewTask   from './components/NewTask/NewTask';
import useHttp   from './hooks/use-http';

import taskObj from './models/taskObj';
import {TasksContext} from './hooks/TasksContext';

function App() {
  const TasksCtx = useContext(TasksContext);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    refreshFromServerHandler();
  }, []);

  const transformTasks = (taskList : taskObj[]) => {
    console.log("App.useEffect.transformTasks");
    TasksCtx.clearTasks();
    for (const taskKey in taskList) {
      TasksCtx.addTask(taskList[taskKey].id, taskList[taskKey].text );
    }
  };
  
  const refreshFromServerHandler = () => {
    console.log("App.refreshFromServerHandler")
    fetchTasks(
      { url: 'http://localhost:8081/Tasks/getTasks' },
      transformTasks
    );    
  };

  return (
    <React.Fragment>
      <NewTask />
      <TasksList
        loading={isLoading}
        error={error}
        onFetch={refreshFromServerHandler}
      />
    </React.Fragment>
  );
}

export default App;