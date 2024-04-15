import app from "@/index";
import { createEmployeeTest } from "@/test/utils/create-employee-test";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { describe } from "node:test";
import request from "supertest";

const prisma = new PrismaClient();

describe("Generate report Controller", () => {
    test("should generate report", async () => {
      const firstDayOfMonth = dayjs().startOf('month');
      const lastDayOfMonth = firstDayOfMonth.endOf('month');
      const fifteenthDayOfMonth = firstDayOfMonth.add(28, 'day'); // 15th day of the month

      const { employee } = await createEmployeeTest();

      for (let currentDay = firstDayOfMonth; currentDay.isBefore(lastDayOfMonth) || currentDay.isSame(lastDayOfMonth, 'day'); currentDay = currentDay.add(1, 'day')) {
        if (currentDay.day() !== 0 && currentDay.day() !== 6) { // Excludes weekends
          if (currentDay.isBefore(fifteenthDayOfMonth) || currentDay.isSame(fifteenthDayOfMonth, 'day')) {
            const clockedIn = currentDay.set('hour', 8).set('minute', 0).set('second', 0).toDate();
            const lunchStart = currentDay.set('hour', 12).toDate();
            const lunchEnd = currentDay.set('hour', 13).toDate();
            const clockedOut = currentDay.set('hour', 18).toDate();
            
            // Create clocked-in entry
            const attendance = await request(app).post("/schedules").send({
              rfid: employee.body.rfid,
              clockedIn: clockedIn,
              delay: 0,
            });

            // Update with lunch start time
            await request(app).put(`/schedules/lunchstart/${attendance.body.id}`).send({
              rfid: employee.body.rfid,
              lunchStart: lunchStart,
              delay: 0,
            });

            // Update with lunch end time
            await request(app).put(`/schedules/lunchend/${attendance.body.id}`).send({
              rfid: employee.body.rfid,
              lunchEnd: lunchEnd,
              delay: 0,
            });

            // Update with clocked out time
            await request(app).put(`/schedules/clockedout/${attendance.body.id}`).send({
              rfid: employee.body.rfid,
              clockedOut: clockedOut,
            });
          }
        }
      }

      await request(app).post(`/abono`).send({
        rfid: employee.body.rfid,
        date:  "2024-04-29T23:59:00.000Z",
        reason: "Nada"
      })

      await request(app).post(`/holiday`).send({
        date:  "2024-04-30T23:59:00.000Z",
        reason: "Nada"
      })

      const report = await request(app).get("/report").send({
        rfid: employee.body.rfid,
        startDate: firstDayOfMonth.toDate(),
        endDate: lastDayOfMonth.toDate()
      });

      console.log(report.body);
    });
});
