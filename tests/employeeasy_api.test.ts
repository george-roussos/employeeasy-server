import User from "../src/models/User.model";
import initialUsers from "./test_helper";
import mongoose from "mongoose";
import router from "../src/server";
import supertest from "supertest";

const api = supertest(router);

let authToken = "";

beforeEach(async () => {
  await User.deleteMany({});
  const user1 = new User(initialUsers[0]);
  await user1.save();
  const user2 = new User(initialUsers[1]);
  await user2.save();
  const user3 = new User(initialUsers[2]);
  await user3.save();
});

describe("when some users do exist", () => {
  test("GET request to users works", async () => {
    const response = await api.get("/api/users");
    expect(response.body.users).toHaveLength(3);
  });

  test("users have id property", async () => {
    const response = await api.get("/api/users");
    expect(response.body.users[0]._id).toBeDefined();
  });

  test("sending a DELETE request works", async () => {
    await api.delete("/api/users/62385f217d76da5ce81bb425").expect(200);
  });

  test("login works", async () => {
    const credentials = {
      username: "annaforsberg",
      password: "12345",
    };
    await api
      .post("/api/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");
  });

  test("grabbing auth token works", async () => {
    const credentials = {
      username: "annaforsberg",
      password: "12345",
    };

    authToken = await api
      .post("/api/login")
      .send(credentials)
      .then((response) => response.text);

    expect(authToken).toHaveLength(2401);
  });

  test("entering a wrong password prevents login", async () => {
    const credentials = {
      username: "annaforsberg",
      password: "12344",
    };
    await api.post("/api/login").send(credentials).expect(401);
  });
});

describe("when logged in", () => {
  test("adding an employee works", async () => {
    const initialResponse = await api.get("/api/employees");
    const initialEmployees = initialResponse.body.employees.map((r: any) => r);
    const newEmployee = {
      name: "Olivia Andersson",
      phone: "+46721234567",
      email: "oliviaandersson@gmail.com",
      department: "Finance",
      startDate: "2019-08-01",
      employmentType: "Permanent",
    };
    await api
      .post("/api/employees")
      .send(newEmployee)
      .set("Authorization", `bearer ${authToken}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/employees");

    const contents = response.body.employees.map((r: any) => r.name);

    expect(contents).toHaveLength(initialEmployees.length + 1);
    expect(contents).toContain("Olivia Andersson");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
