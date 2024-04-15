
import { generatePdfController, generateReportController } from "@/infra/http/controllers/attendance";
import { Router } from "express";

const reportRoutes = Router();

reportRoutes.get("/", (request, response, next) => {
  return generateReportController.handle(request, response, next);
});

reportRoutes.get("/pdf/:rfid", (request, response, next) => {
  return generatePdfController.handle(request, response, next);
});



export { reportRoutes };

