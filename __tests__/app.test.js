const { userData, favesData } = require("../db/data/test-data/");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
// const jestsorted = require("jest-sorted");

const app = require("../app");

const endpointsJson = require("../endpoints.json");

beforeEach(() => seed({ userData, favesData }));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/users/:username", () => {
  test("200: Responds with the requested user", () => {
    return request(app)
      .get("/api/users/bob")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user.username).toBe("bob");
        expect(user.email).toBe("bob@bob.com");
        expect(user.password_hashed).toBe("svesgsevaesrdwefs235r2twfcd");
      });
  });
  test("404: Responds with an error message when given a non-existent username", () => {
    return request(app)
      .get("/api/users/billandbentheflowerpotmen")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("POST /api/users/signup", () => {
  test("201: Adds a new user", () => {
    const newUser = {
      username: "al",
      email: "al@al.com",
      password: "cjwikfiawebafkwbjfwks",
    };
    return request(app)
      .post("/api/users/signup")
      .send(newUser)
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user.username).toBe("al");
        expect(user.email).toBe("al@al.com");
        expect(user.password_hashed).toEqual(expect.any(String));
      });
  });
  test("400: Responds with an error message when given incomplete required data, ex. missing email", () => {
    const newUser = {
      username: "al",
      password: "cjwikfiawebafkwbjfwks",
    };
    return request(app)
      .post("/api/users/signup")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Please enter username, email and password.");
      });
  });
});

describe("POST /api/users/signin", () => {
  test("201: Signs in a user", () => {
    const user = {
      username: "amber",
      email: "amber@chan.com",
      password: "ilovesnuggles",
    };
    return request(app)
      .post("/api/users/signin")
      .send(user)
      .expect(201)
      .then(({ body}) => {
        expect(body.user.username).toBe("amber");
        expect(body.msg).toBe("Login successful.");
      });
  });
  test("400: Responds with an error message when given incomplete required data, ex. missing password", () => {
    const newUser = {
      username: "al",
    };
    return request(app)
      .post("/api/users/signin")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Please enter your username and password.");
      });
  });
});

describe("GET /api/users/:username/faves", () => {
  test("200: Responds with an array of favourite works for the given username", () => {
    return request(app)
      .get("/api/users/bob/faves")
      .expect(200)

      .then(({ body: { faves } }) => {
        // console.log(faves);
        expect(faves.length).toBe(2);
        // comments.forEach((comment) => {
        //   expect(typeof comment.comment_id).toBe("number");
        //   expect(typeof comment.votes).toBe("number");
        //   expect(typeof comment.created_at).toBe("string");
        //   expect(typeof comment.author).toBe("string");
        //   expect(typeof comment.body).toBe("string");
        //   expect(comment.article_id).toBe(3);
        // });
      });
  });
});

describe("General error tests", () => {
  test("404: Responds with error message when given an invalid endpoint", () => {
    return request(app)
      .get("/api/oh-noes")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not found");
      });
  });
});
