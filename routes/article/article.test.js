const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Article Route Test", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("GET /api/v1/blog", () => {
    test("It should return all published articles", async () => {
      const response = await request(app).get("/api/v1/blog");
      expect(200);
    });
  });

  describe("GET /api/v1/blog/:id", () => {
    test("It should return a published articles", async () => {
      const response = await request(app).get("/api/v1/blog/1");
      expect(200);
      expect(response.body._id).toBe(1);
    });

    test("It should catch if article not found", async () => {
      const response = await request(app).get("/api/v1/blog/2000");
      expect(404);
      expect(response.body).toStrictEqual({ message: "Article not found" });
    });
  });
});
