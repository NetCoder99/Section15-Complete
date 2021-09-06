import { useRef } from "react";

import classes from "./TaskForm.module.css";

const TaskForm = (props) => {
  console.log("TaskForm.init");
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredValue = taskInputRef.current.value;
    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
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
