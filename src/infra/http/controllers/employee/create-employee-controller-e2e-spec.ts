import app from "@/index";
import { createJourneyTest } from "@/test/utils/create-journey-test";
import { PrismaClient } from "@prisma/client";
import { describe } from "node:test";
import request from "supertest";

const prisma = new PrismaClient();

describe("Create employee Controller", () => {
    test("should create a employee", async () => {
        const { journey } = await createJourneyTest();
        const employee = await request(app).post("/employee").send({
          name: 'João da Silva',
          imgUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
          journeyId: journey.body.id,
          position: "Desenvolvedor",
          rfid: "3438743874",
        })
        
        expect(employee.status).toBe(201);

    });
})