import {
	deleteAttendanceController,
	editClockedOutAttendanceController,
	editFirstTimeController,
	editLunchEndAttendanceController,
	editLunchStartAttendanceController,
	getSchedulesByEmployeeIdController,
	listAttendanceController,
} from "@/infra/http/controllers/attendance";
import { Router } from "express";

const AttendancesRoutes = Router();

AttendancesRoutes.get("/list", (request, response, next) => {
	return listAttendanceController.handle(request, response, next);
});

AttendancesRoutes.put("/edit/clockedIn/:attendanceId", (request, response, next) => {
	return editFirstTimeController.handle(request, response, next);
});

AttendancesRoutes.put("/edit/lunchStart/:id", (request, response, next) => {
	return editLunchStartAttendanceController.handle(request, response, next);
});

AttendancesRoutes.put("/edit/lunchEnd/:id", (request, response, next) => {
	return editLunchEndAttendanceController.handle(request, response, next);
});

AttendancesRoutes.put("/edit/clockedOut/:id", (request, response, next) => {
	return editClockedOutAttendanceController.handle(request, response, next);
});
AttendancesRoutes.get("/employee/:id", (request, response, next) => {
	return getSchedulesByEmployeeIdController.handle(request, response, next);
});

AttendancesRoutes.delete("/:id", (request, response, next) => {
	return deleteAttendanceController.handle(request, response, next);
});
export { AttendancesRoutes };
