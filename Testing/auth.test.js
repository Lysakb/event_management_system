const request = require("supertest");
const { connect } = require("./database");
const app = require("../src/index");
const userModel = require("../src/model/user");

describe("Auth route test", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  // afterEach(async () => {
  //   await conn.cleanup();
  // });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should signup a user ", async () => {
    const response = await request(app).post("/user/register").send({
      name: "victor",
      password: "Password123",
      email: "victor@mail.com",
      role: "user",
    });
    expect(response.status).toBe(200);
  });

  it("should login a user", async () => {

    const response = await request(app)
      .post("/user/login")
      .send({ email: "victor@mail.com", password: "Password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
  });
});
