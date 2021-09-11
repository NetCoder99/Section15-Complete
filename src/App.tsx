import React, { useEffect, useContext, useCallback } from 'react';

import NewTask   from './components/NewTask/NewTask';
import TasksList from './components/Tasks/TasksList';

import useHttp       from './hooks/use-http';
import {TasksContext} from './hooks/TasksContext';

import taskObj        from './models/taskObj';

function App() {
  const TasksCtx = useContext(TasksContext);
  const { apiStatus, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    refreshFromServerHandler();
  }, []);

  const transformTasks = useCallback((taskList : taskObj[]) => {
    console.log("App.useEffect.transformTasks");
    TasksCtx.setTasks(taskList);
  }, []);
  
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
        loading={apiStatus.isLoading}
        error={apiStatus.errorMsg}
        onFetch={refreshFromServerHandler}
      />

    </React.Fragment>
  );
}

export default App;