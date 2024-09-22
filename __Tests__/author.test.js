import app from "../server.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import  request  from "supertest";

const prisma = new PrismaClient();

let token;

describe("Register author", () => {
    it("route should return 201", async () => {
        const result = await request(app)
            .post("/api/V1/authors/register")
            .send({
                authorName: "Gibbs White",
                email: "gibbs@email.com",
                password: "gibbs123",
                imageUrl: "authors image"
            });

        expect(result.status).toBe(StatusCodes.CREATED);
        expect(result.body.message).toBe("Author registered Successfully");
    });

    it("route should return 406 ", async () => {
        const result = await request(app)
            .post("/api/V1/authors/register")
            .send({
                authorName: "Gibbs White",
                email: "gibbs@email.com",
                password: "gibbs123",
                imageUrl: "authors image"
            });

        expect(result.status).toBe(StatusCodes.NOT_ACCEPTABLE);
        expect(result.body.message).toBe("Author with email already exists");
    });

    it("route should return 406 ", async () => {
        const result = await request(app)
            .post("/api/V1/authors/register")
            .send({
                authorName: "Yasser Araphat",
                email: "araphat@email.com",
                password: "yasser123",
                imageUrl: "authors image"
            });

        expect(result.status).toBe(StatusCodes.NOT_ACCEPTABLE);
        expect(result.body.message).toBe("Author with email already exists");
    });
});

describe("Author Login", () => {
    it("empty field", async () => {
        const response = await request(app).post("/api/V1/authors//login").send({});

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe("Provide email and password");
    });

    it("should return token and 201", async () => {
        const response = await request(app)
            .post("/api/V1/authors//login")
            .send({ email: "araphat@email.com", password: "yasser123" });

        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.message).toBe("Author LoggedIn");
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
});

describe("get all authors", () => {
    it("will return all authors", async () => {
        const response = await request(app)
            .get("/api/V1/authors/")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.authors).toEqual(
            expect.arrayContaining([
                {
                    id: expect.any(Number),
                    authorName: expect.any(String),
                    email: expect.any(String),
                    password: expect.any(String),
                    imageUrl: expect.any(String),
                },
            ])
        );
    });
});

describe("get author by id", () => {
    it("will return author", async () => {
        //we need to get an author from db to provide an id
        const author = await prisma.author.findFirst();
        const response = await request(app)
            .get(`/api/V1/authors/${author.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.author).toBeDefined();
    });

    it("return 404 if id does not exit", async () => {
        const response = await request(app)
            .get("/api/V1/authors/871")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
});