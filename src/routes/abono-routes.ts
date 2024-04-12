
import { paidAttendanceController } from "@/infra/http/controllers/attendance";
import { Router } from "express";

const AbonoRoutes = Router();

AbonoRoutes.post("/", (request, response, next) => {
  return paidAttendanceController.handle(request, response, next);
});


export { AbonoRoutes };

