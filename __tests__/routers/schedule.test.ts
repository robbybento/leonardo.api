import request, { Response } from "supertest";
import app from "../../src/app";
import dayjs from "dayjs";

let accountId: string;
let scheduleId: string;

describe("/schedule", () => {
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

  it("POST - should create a schedule", async () => {
    return request(app)
      .post("/schedule")
      .send({
        accountId,
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

  it("POST - should fail to create an schedule", async () => {
    return request(app)
      .post("/schedule")
      .expect(500)
      .then((response: Response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body.issues.length).toBeGreaterThan(0)
      });
  });

  it("PUT - should update a schedule", async () => {
    return request(app)
      .put(`/schedule/${scheduleId}`)
      .send({
        start_time: dayjs().toDate(),
        end_time: dayjs().add(2, "week").toDate(),
      })
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.accountId).toBeDefined();
        expect(response.body.start_time).toBeDefined();
        expect(response.body.end_time).toBeDefined();
      });
  });

  it("GET - should get an schedule", async () => {
    return request(app)
      .get(`/schedule/${scheduleId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
      });
  });

  it("GET - should get all schedules", async () => {
    return request(app)
      .get(`/schedule`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0)
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

  

});
