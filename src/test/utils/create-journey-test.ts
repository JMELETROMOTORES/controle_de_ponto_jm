
import request from "supertest";
import app from "@/index";
export async function createJourneyTest() {
    const journey  = await request(app).post("/journey").send({
        name: "jornada padrão",
        start_date: "08:00",
        start_date_toleranceDelay: "08:10",
        end_date: "18:10",
        lunch_time_tolerance: 60,
        start_date_toleranceExtraTime: "07:50",
        end_date_toleranceExtraTime: "18:10",
    });

    return { journey };
}