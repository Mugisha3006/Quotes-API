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