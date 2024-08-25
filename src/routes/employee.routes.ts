import {
	createEmployeeController,
	deleteEmployeeController,
	editEmployeeController,
	getEmployeeController,
	listEmployeeController,
} from "@/infra/http/controllers/employee";
import { Router } from "express";

const EmployeeRoutes = Router();

EmployeeRoutes.post("/create", (request, response, next) => {
	return createEmployeeController.handle(request, response, next);
});

EmployeeRoutes.get("/list", (request, response, next) => {
	return listEmployeeController.handle(request, response, next);
});

EmployeeRoutes.delete("/:id", (request, response, next) => {
	return deleteEmployeeController.handle(request, response, next);
});

EmployeeRoutes.put("/:id", (request, response, next) => {
	return editEmployeeController.handle(request, response, next);
});
EmployeeRoutes.get("/:id", (request, response, next) => {
	return getEmployeeController.handle(request, response, next);
});

export { EmployeeRoutes };
