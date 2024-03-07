import app from "@/index";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

const prisma = new PrismaClient();

test("should create a journey", async () => {
    const response = await request(app).post("/journey").send({
        name: "Jornada padrão",
        start_date: "08:00",
        end_date: "18:00",
        lunch_time_tolerance: 60,
    });

    expect(response.status).toBe(201);

    const journeyInDatabase = await prisma.journey.findUnique({
        where: {
            id: response.body.id,
        },
    });

    console.log(journeyInDatabase);
});

