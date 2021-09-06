import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './TasksList.module.css';

import useHttp from '../../hooks/use-http';


const TasksList = (props) => {
  console.log("TasksList.init")
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const deleteTask = (taskID, taskData) => {
    console.log("NewTask.deleteTask")
    props.onDelete(taskID);
    //taskCounter.increment();
  };

  const deleteTaskHandler = async (taskId) => {
    console.log("TasksList.deleteTaskHandler");
    sendTaskRequest(
      {
        url: 'http://localhost:8081/Tasks/delTask',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {"taskId": taskId},
      },
      deleteTask.bind(null, taskId)
    );
  };

  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id} id={task.id} onDelete={deleteTaskHandler}>
            {task.id} : {task.text}
          </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading tasks...';
  }

  return (
    <Section>
      <div className={classes.container} onClick={props.onFetch}><button>Refresh</button></div>
      <hr />
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default TasksList;