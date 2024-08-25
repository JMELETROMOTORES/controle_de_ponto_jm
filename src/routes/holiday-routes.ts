import {
	createHolidayController,
	deleteHolidayController,
	listHolidayController,
} from "@/infra/http/controllers/holiday";
import { Router } from "express";

const holidayRoutes = Router();

holidayRoutes.post("/create", (request, response, next) => {
	return createHolidayController.handle(request, response, next);
});

holidayRoutes.get("/list", (request, response, next) => {
	return listHolidayController.handle(request, response, next);
});

holidayRoutes.delete("/delete/:id", (request, response, next) => {
	return deleteHolidayController.handle(request, response, next);
});

export { holidayRoutes };
