const request = require("supertest");
const { response } = require("../../app");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const getTestToken = require("../../utils/getTestToken");

describe("Article Route Test", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  const userWithArticle = {
    email: "ade@gmail.com",
    password: "123456",
  };

  const userWithoutArticle = {
    email: "ade@hotmail.com",
    password: "45678",
  };

  const articleData = {
    title: Math.random().toString(16).substring(2, 8),
    description: "Second",
    body: "Love all Business demands continuous delivery of value.",
    tags: ["tech"],
  };

  const existArticleData = {
    title: "Tech",
    description: "Second",
    body: "Love all Business demands continuous delivery of value.",
    tags: ["tech"],
  };

  const emptyArticle = {
    title: "",
    body: "",
  };

  const updateData = {
    state: "published",
  };

  const randomInt = Math.floor(Math.random() * (27 - 12) + 12);

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

  describe("GET /api/v1/blog/list", () => {
    let _token = null;
    beforeEach(async () => {
      _token = await getTestToken(request, app, userWithArticle);
    });

    test("It should return user's article list", async () => {
      const response = await request(app)
        .get("/api/v1/blog/list")
        .set("Authorization", "Bearer " + _token);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /api/v1/blog/list", () => {
    let _token = null;
    beforeEach(async () => {
      _token = await getTestToken(request, app, userWithoutArticle);
    });

    test("It should catch if no article for user", async () => {
      const response = await request(app)
        .get("/api/v1/blog/list")
        .set("Authorization", "Bearer " + _token);
      expect(404);
      expect(response.body).toStrictEqual({
        message: "No Articles found",
      });
    });
  });

  describe("POST /api/v1/blog", () => {
    let _token = null;
    beforeEach(async () => {
      _token = await getTestToken(request, app, userWithArticle);
    });

    test("It should check if user is logged in", async () => {
      const response = await request(app).post("/api/v1/blog");
      expect(401);
      expect(response.body).toStrictEqual({
        message: "Unauthorized",
      });
    });

    test("It should create an article", async () => {
      const response = await request(app)
        .post("/api/v1/blog")
        .send(articleData)
        .set("Authorization", "Bearer " + _token);
      expect(response.statusCode).toBe(201);
    });

    test("It should catch if article title already exist", async () => {
      const response = await request(app)
        .post("/api/v1/blog")
        .send(emptyArticle)
        .set("Authorization", "Bearer " + _token);
      expect(400);
      expect(response.body).toStrictEqual({
        error: "Missing required property",
      });
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/api/v1/blog")
        .send(existArticleData)
        .set("Authorization", "Bearer " + _token);
      expect(409);
      expect(response.body).toStrictEqual({
        message: "Article with title already exists",
      });
    });
  });

  describe("PUT /api/v1/blog/:id", () => {
    let _token = null;
    beforeEach(async () => {
      _token = await getTestToken(request, app, userWithArticle);
    });

    test("It should check if user is logged in", async () => {
      const response = await request(app).put("/api/v1/blog/14");
      expect(401);
      expect(response.body).toStrictEqual({
        message: "Unauthorized",
      });
    });

    test("It should update article", async () => {
      const response = await request(app)
        .put(`/api/v1/blog/${randomInt}`)
        .send(updateData)
        .set("Authorization", "Bearer " + _token);
      expect(201);
      expect(response.body).toStrictEqual({ message: "Article Updated" });
    });

    test("It should check if article exist", async () => {
      const response = await request(app)
        .put("/api/v1/blog/2")
        .send(updateData)
        .set("Authorization", "Bearer " + _token);
      expect(404);
      expect(response.body).toStrictEqual({ message: "Article not found" });
    });

    test("It should catch missing update article value", async () => {
      const response = await request(app)
        .put("/api/v1/blog/12")
        .send({})
        .set("Authorization", "Bearer " + _token);
      expect(400);
      expect(response.body).toStrictEqual({
        error: "Please enter an update value",
      });
    });

    test("It should catch particular user article", async () => {
      const response = await request(app)
        .put("/api/v1/blog/1")
        .send(updateData)
        .set("Authorization", "Bearer " + _token);
      expect(401);
      expect(response.body).toStrictEqual({
        message: "Unauthorized to update article",
      });
    });
  });

  describe("DELETE /api/v1/blog/:id", () => {
    let _token = null;
    beforeEach(async () => {
      _token = await getTestToken(request, app, userWithArticle);
    });

    test("It should check if user is logged in", async () => {
      const response = await request(app).delete("/api/v1/blog/11");
      expect(401);
      expect(response.body).toStrictEqual({
        message: "Unauthorized",
      });
    });

    test("It should check if article exist", async () => {
      const response = await request(app)
        .delete("/api/v1/blog/2")
        .set("Authorization", "Bearer " + _token);
      expect(404);
      expect(response.body).toStrictEqual({ message: "Article not found" });
    });

    test("It should catch particular user article", async () => {
      const response = await request(app)
        .delete("/api/v1/blog/1")
        .set("Authorization", "Bearer " + _token);
      expect(401);
      expect(response.body).toStrictEqual({
        message: "Unauthorized to delete article",
      });
    });
  });
});
