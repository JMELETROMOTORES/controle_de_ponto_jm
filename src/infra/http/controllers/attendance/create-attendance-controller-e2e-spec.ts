import app from "@/index";
import { createEmployeeTest } from "@/test/utils/create-employee-test";
import { createJourneyTest } from "@/test/utils/create-journey-test";
import { PrismaClient } from "@prisma/client";
import { describe } from "node:test";
import request from "supertest";

const prisma = new PrismaClient();

describe("Create attendance Controller", () => {
    test("should create a attendance", async () => {
        const { employee } = await createEmployeeTest();
        const clockedIn = await request(app).post("/schedules").send({
            rfid: employee.body.rfid,
            clockedIn: "2024-04-15T11:00:00.000Z"
        });

        await request(app).put(`/schedules/lunchstart/${clockedIn.body.id}`).send({
          rfid: employee.body.rfid,
          lunchStart: "2024-04-15T15:00:00.000Z"
      });

        await request(app).put(`/schedules/lunchend/${clockedIn.body.id}`).send({
          rfid: employee.body.rfid,
          lunchEnd: "2024-04-15T16:00:00.000Z"
        });

        await request(app).put(`/schedules/clockedout/${clockedIn.body.id}`).send({
          rfid: employee.body.rfid,
          clockedOut: "2024-04-15T21:00:00.000Z"
        });
        
        const attendanceInDatabase = await prisma.attendance.findUnique({
            where: {
                id: clockedIn.body.id,
            },
        });

        expect(attendanceInDatabase).toBeTruthy();
    
        
      
    });
})