const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("User Route Test", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  const regUser = {
    email: "naf@hotmail.com",
    first_name: "Nafiu",
    last_name: "Adegbite",
    password: "456789",
  };

  const invalidUser = {
    email: "john@gmail.com",
    password: "192891",
  };

  const userData = {
    email: "naf@hotmail.com",
    password: "456789",
  };

  describe("POST /api/v1/user/login", () => {
    // beforeEach(async () => {
    //   const response = await request(app)
    //     .post("/api/v1/user/register")
    //     .set("Content-Type", "application/json")
    //     .send(regUser);
    // });

    // test("It should check if logged in successful", async () => {
    //   const response = await request(app)
    //     .post("/api/v1/user/login")
    //     .send(userData);
    //   expect(200);
    //   expect(response.body.success).toBe("true");
    // });

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
});
