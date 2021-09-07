import classes from "./TaskItem.module.css";
import { BsTrash } from "react-icons/bs";

const TaskItem: React.FC<{key: string, id: string, onDelete:(taskId: string) => void}>= (props) => {
  console.log("TaskItem.init.id:"+props.id);

  const onDelClickHandler = (event: React.MouseEvent) => {
    console.log("TaskItem.onDelClickHandler");
    const taskId = event.currentTarget.id;
    console.log("TaskItem.onDelClickHandler.taskId:"+taskId);
    props.onDelete(taskId);
  };

  return (
    <li className={classes.task}>
      <button onClick={onDelClickHandler} id={props.id}>
        <BsTrash />
      </button>
      {props.children}
    </li>
  );
};

export default TaskItem;
