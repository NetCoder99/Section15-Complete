import React, {useContext} from "react";

import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import classes from "./TasksList.module.css";
import useHttp from "../../hooks/use-http";

import taskObj from "../../models/taskObj";
import {TasksContext} from '../../hooks/TasksContext';


const TasksList: React.FC<{
  loading:  boolean;
  error:    any;
  onFetch:  () => void;
}> = (props) => {
  console.log("TasksList.init");
  const TasksCtx = useContext(TasksContext);
  const { apiStatus, sendRequest: sendTaskRequest } = useHttp();

  const deleteTask = (taskID: string, taskData: taskObj) => {
    console.log("NewTask.deleteTask");
    TasksCtx.delTask(taskID);
  };

  const deleteTaskHandler = (taskId: string) => {
    console.log("TasksList.deleteTaskHandler");
    sendTaskRequest(
      {
        url: "http://localhost:8081/Tasks/delTask",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { taskId: taskId },
      },
      deleteTask.bind(null, taskId)
    );
  };

  let taskList = <h2>No tasks found. Start adding some!</h2>;

  // if (props.items.length > 0) {
  //   taskList = (
  //     <ul>
  //       {props.items.map((task) => (
  //         <TaskItem key={task.id} id={task.id} onDelete={deleteTaskHandler}>
  //           {task.id} : {task.text}
  //         </TaskItem>
  //       ))}
  //     </ul>
  //   );
  // }

  if (TasksCtx.items.length > 0) {
    taskList = (
      <ul>
        {TasksCtx.items.map((task) => (
          <TaskItem key={task.id} id={task.id} onDelete={deleteTaskHandler}>
            Context : {task.id} : {task.text}
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
    content = <span>"Loading tasks..."</span>
  }
  if (apiStatus.isLoading) {
    content = <span>"Deleting task..."</span>
  }

  return (
    <Section>
      <div className={classes.container} onClick={props.onFetch}>
        <button disabled={props.loading || apiStatus.isLoading}>Refresh from server</button>
        {/* <button disabled={props.loading || isDeleting}>Refresh from cache</button> */}
      </div>
      <hr />
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default TasksList;
