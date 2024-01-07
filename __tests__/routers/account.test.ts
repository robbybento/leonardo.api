import request, { Response } from "supertest";
import app from "../../src/app";

let accountId:string

describe("/account", () => {

  it("POST - should create an account", async () => {
    return request(app)
      .post("/account")
      .send({ name: "Robby" })
      .expect(200)
      .then((response: Response) => {
        accountId = response.body.id
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Robby');
      });
  });

  it("POST - should fail to create an account", async () => {
    return request(app)
      .post("/account")
      .send({ wrong_name_field: "Robby" })
      .expect(500)
      .then((response: Response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body.issues.length).toBeGreaterThan(0)
      });
  });

  it("PUT - should update an account", async () => {
    return request(app)
      .put(`/account/${accountId}`)
      .send({ name: "Robert" })
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Robert');
      });
  });

  it("GET - should get an account", async () => {
    return request(app)
      .get(`/account/${accountId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Robert');
      });
  });

  it("GET - should get all accounts", async () => {
    return request(app)
      .get(`/account`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0)
      });
  });

  it("DELETE - should delete an account", async () => {
    return request(app)
      .delete(`/account/${accountId}`)
      .expect(200)
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Robert');
      });
  });
});
