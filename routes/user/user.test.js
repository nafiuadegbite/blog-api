const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const getTestToken = require("../../utils/getTestToken");

describe("User Route Test", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  const invalidUser = {
    email: "john@gmail.com",
    password: "192891",
  };

  const userWithArticle = {
    email: "ade@gmail.com",
    password: "123456",
  };

  describe("POST /api/v1/user/login", () => {
    test("It should check if logged in successful", async () => {
      const response = await request(app)
        .post("/api/v1/user/login")
        .send(userWithArticle);
      expect(200);
      expect(response.body.success).toBe("true");
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/api/v1/user/login")
        .send({ email: "", password: "" });
      expect(400);
      expect(response.body).toStrictEqual({
        error: "Missing required login property",
      });
    });

    test("It should check email regex", async () => {
      const response = await request(app)
        .post("/api/v1/user/login")
        .send({ email: "ades@hit", password: "1233" });
      expect(400);
      expect(response.body).toStrictEqual({
        message: "Enter a valid email address",
      });
    });

    test("It should check if user exist", async () => {
      const response = await request(app)
        .post("/api/v1/user/login")
        .send(invalidUser);
      expect(401);
      expect(response.body).toStrictEqual({ message: "Invalid Credentials" });
    });
  });

  describe("GET /api/v1/user/profile", () => {
    let _token = null;
    beforeEach(async () => {
      _token = await getTestToken(request, app, userWithArticle);
    });

    test("It should check if user is logged in", async () => {
      const response = await request(app).get("/api/v1/user/profile");
      expect(401);
      expect(response.body).toStrictEqual({
        message: "Unauthorized",
      });
    });

    test("It should return user's profile", async () => {
      const response = await request(app)
        .get("/api/v1/user/profile")
        .set("Authorization", "Bearer " + _token);
      expect(response.statusCode).toBe(200);
    });
  });
});
