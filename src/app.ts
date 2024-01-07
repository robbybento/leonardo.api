import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import accountRouter from './routers/account'
import agentRouter from './routers/agent'
import scheduleRouter from './routers/schedule'
import taskRouter from './routers/task'

const app = express();

app.use(bodyParser.json());

app.get("/", (request: Request, response: Response) => {
  response.send("leonardo api 1.0.0");
});

app.use(accountRouter)
app.use(agentRouter)
app.use(scheduleRouter)
app.use(taskRouter)

export default app