import { createServer, Model } from "miragejs";

export function makeServer({ environment = "dev" } = {}) {
  console.log("makeServer");
  let server = createServer({
    environment,

    models: {
      taskEntry: Model,
      todo: Model,
    },

    seeds(server) {
      server.create("taskEntry", { text: "Learn React" })
      server.create("taskEntry", { text: "Learn React Custom Hooks" })
      server.create("taskEntry", { text: "Learn React with mirage api mock" })

      server.create("todo", { content: "Learn Mirage JS" })
      server.create("todo", { content: "Integrate With Vue.js" })
    },

    //'http://localhost:8081/Tasks/getTasks'
    routes() {
      this.timing = 500
      this.get("http://localhost:8081/Tasks/getTasks", (schema) => {
        console.log("makeServer.getTasks");
        return schema.db.taskEntries;
      })
      this.post("http://localhost:8081/Tasks/addTask", (schema, request) => {
        console.log("makeServer.addTask");
        const newTaskTemp = JSON.parse(request.requestBody);
        const newTask = schema.taskEntries.create(newTaskTemp);
        return newTask;
      },{ timing: 1000 })
      this.post("http://localhost:8081/Tasks/delTask", (schema, request) => {
        console.log("makeServer.delTask");
        const taskId = JSON.parse(request.requestBody).taskId;
        schema.taskEntries.find(taskId).destroy();
        return taskId;
      },{ timing: 500 })
    },
  });

  return server;
}
