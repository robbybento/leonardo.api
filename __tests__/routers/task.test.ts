import request, { Response } from "supertest";
import app from "../../src/app";
import dayjs from "dayjs";

let accountId: string;
let agentId: string;
let scheduleId: string;
let taskId: string;

describe("/task", () => {
  it("POST - should create an account", async () => {
    return request(app)
      .post("/account")
      .send({ name: "Robby" })
      .expect(200)
      .then((response: Response) => {
        accountId = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Robby");
      });
  });

  it("POST - should create an agent", async () => {
    return request(app)
      .post("/agent")
      .send({ name: "Tim" })
      .expect(200)
      .then((response: Response) => {
        agentId = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Tim");
      });
  });

  it("POST - should create a schedule", async () => {
    return request(app)
      .post("/schedule")
      .send({
        accountId, agentId,
        start_time: dayjs().toDate(),
        end_time: dayjs().add(1, "week").toDate(),
      })
      .expect(200)
      .then((response: Response) => {
        scheduleId = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.start_time).toBeDefined();
        expect(response.body.end_time).toBeDefined();
      });
  });

  it("POST - should create a task", async () => {
    return request(app)
      .post("/task")
      .send({
        scheduleId,
        name: 'Take out the trash',
        type: 'work',
        start_time: dayjs().toDate(),
        duration: 1
      })
      .expect(200)
      .then((response: Response) => {
        taskId = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.start_time).toBeDefined();
        expect(response.body.duration).toBeGreaterThan(0)
      });
  });

  it("POST - should fail to create an task", async () => {
    return request(app)
      .post("/task")
      .expect(500)
      .then((response: Response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body.issues.length).toBeGreaterThan(0)
      });
  });

  it("PUT - should update a task", async () => {
    return request(app)
      .put(`/task/${taskId}`)
      .send({
        start_time: dayjs().toDate(),
        end_time: dayjs().add(2, "week").toDate(),
      })
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.start_time).toBeDefined();
      });
  });

  it("GET - should get an task", async () => {
    return request(app)
      .get(`/task/${taskId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
      });
  });

  it("GET - should get all tasks", async () => {
    return request(app)
      .get(`/task`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0)
      });
  });

  it("DELETE - should delete a task", async () => {
    return request(app)
      .delete(`/task/${taskId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.start_time).toBeDefined();
      });
  });

  it("DELETE - should delete a schedule", async () => {
    return request(app)
      .delete(`/schedule/${scheduleId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.accountId).toBeDefined();
        expect(response.body.agentId).toBeDefined();
        expect(response.body.start_time).toBeDefined();
        expect(response.body.end_time).toBeDefined();
      });
  });

  it("DELETE - should delete an account", async () => {
    return request(app)
      .delete(`/account/${accountId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Robby');
      });
  });

  it("DELETE - should delete an agent", async () => {
    return request(app)
      .delete(`/agent/${agentId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Tim');
      });
  });


});
