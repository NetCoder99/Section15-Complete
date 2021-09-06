import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';
import {useCounter} from '../../hooks/useCounter';

const NewTask = (props) => {
  console.log("NewTask.init")

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  const taskCounter = useCounter();

  const createTask = (taskText, taskData) => {
    console.log("NewTask.createTask")
    props.onAddTask(taskData.taskEntry);
    taskCounter.increment();
  };

  const enterTaskHandler = async (taskText) => {
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