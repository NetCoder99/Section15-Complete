import React, { useEffect, useState } from 'react';

import TasksList from './components/Tasks/TasksList';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

import taskObj from './models/taskObj';

function App() {
  const [tasks, setTasks] = useState(Array<taskObj>());

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    console.log("App.useEffect");
    const transformTasks = (taskList : taskObj[]) => {
      console.log("App.useEffect.transformTasks");

      const loadedTasks = [];
      for (const taskKey in taskList) {
        loadedTasks.push({ id: taskList[taskKey].id, text: taskList[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'http://localhost:8081/Tasks/getTasks' },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task: taskObj) => {
    console.log("App.taskAddHandler")
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const taskDelHandler = (taskID: string) => {
    console.log("App.taskDelHandler.taskID:"+taskID)
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskID));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <TasksList
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDelete={taskDelHandler}
      />
    </React.Fragment>
  );
}

export default App;