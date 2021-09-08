import {useContext} from 'react';

import Section  from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp  from '../../hooks/use-http';
import {useCounter}   from '../../hooks/useCounter';
import {TasksContext} from '../../hooks/TasksContext';
import taskObj from '../../models/taskObj';

const NewTask: React.FC = (props) => {
  console.log("NewTask.init")

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  const taskCounter = useCounter();
  const TasksCtx    = useContext(TasksContext);

  const createTask = (taskText: string, taskData: any) => {
    console.log("NewTask.createTask");
    const taskItem: taskObj = new taskObj(taskData.taskEntry.id, taskData.taskEntry.text);
    TasksCtx.addTask(taskItem.id, taskItem.text);
    taskCounter.increment();
  };

  const enterTaskHandler = async (taskText: string) => {
    console.log("NewTask.enterTaskHandler");
    sendTaskRequest(
      {
        url: 'http://localhost:8081/Tasks/addTask',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {"text": taskText},
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm tmpId={taskCounter.counter} onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;