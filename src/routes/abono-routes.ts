
import { createAbsenceAllowanceController } from "@/infra/http/controllers/absence-allowance";
import { Router } from "express";

const AbonoRoutes = Router();

AbonoRoutes.post("/", (request, response, next) => {
  return createAbsenceAllowanceController.handle(request, response, next);
});


export { AbonoRoutes };

