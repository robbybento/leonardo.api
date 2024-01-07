import request, { Response } from "supertest";
import app from "../../src/app";

let agentId:string

describe("/agent", () => {

  it("POST - should create an agent", async () => {
    return request(app)
      .post("/agent")
      .send({ name: "Tim" })
      .expect(200)
      .then((response: Response) => {
        agentId = response.body.id
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Tim');
      });
  });

  it("POST - should fail to create an agent", async () => {
    return request(app)
      .post("/agent")
      .send({ wrong_name_field: "Tim" })
      .expect(500)
      .then((response: Response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body.issues.length).toBeGreaterThan(0)
      });
  });

  it("PUT - should update an agent", async () => {
    return request(app)
      .put(`/agent/${agentId}`)
      .send({ name: "Timothy" })
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Timothy');
      });
  });

  it("GET - should get an agent", async () => {
    return request(app)
      .get(`/agent/${agentId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Timothy');
      });
  });

  it("GET - should get all agents", async () => {
    return request(app)
      .get(`/agent`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0)
      });
  });

  it("DELETE - should delete an agent", async () => {
    return request(app)
      .delete(`/agent/${agentId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Timothy');
      });
  });
});
