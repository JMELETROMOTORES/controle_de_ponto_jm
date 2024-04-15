import app from "@/index";
import { createJourneyTest } from "@/test/utils/create-journey-test";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

const prisma = new PrismaClient();

test("should create a journey", async () => {
    const { journey } = await createJourneyTest();
    expect(journey.status).toBe(201);

    const journeyInDatabase = await prisma.journey.findUnique({
        where: {
            id: journey.body.id,
        },
    });


});

