import { createHolidayController } from "@/infra/http/controllers/holiday";
import { Router } from "express";


const holidayRoutes = Router();

holidayRoutes.post("/", (request, response, next) => {
  return createHolidayController.handle(request, response, next);
});



export { holidayRoutes };

