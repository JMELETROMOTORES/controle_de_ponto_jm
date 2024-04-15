
import request from "supertest";
import app from "@/index";
import { createJourneyTest } from "./create-journey-test";
export async function createEmployeeTest() {
  const { journey } = await createJourneyTest();
  const employee = await request(app).post("/employee").send({
    name: 'João da Silva',
    imgUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    journeyId: journey.body.id,
    position: "Desenvolvedor",
    rfid: "3438743874",
  })

  return { employee };
}