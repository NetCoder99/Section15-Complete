import { MouseEvent, useRef } from "react";

import classes from "./TaskForm.module.css";

const TaskForm: React.FC<{
  tmpId: number;
  onEnterTask: (taskText: any) => Promise<void>;
  loading: boolean;
}> = (props) => {
  console.log("TaskForm.init");
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskInputRef && taskInputRef.current) {
      const enteredValue = taskInputRef.current.value;
      if (enteredValue.trim().length > 0) {
        props.onEnterTask(enteredValue);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        ref={taskInputRef}
        value={`test-${props.tmpId}`}
      ></input>
      <button disabled={props.loading}>
        {props.loading ? "Sending..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
