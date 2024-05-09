import {
    editClockedOutAttendanceController,
    editFirstTimeController,
    editLunchEndAttendanceController,
    editLunchStartAttendanceController,
    getSchedulesByEmployeeIdController,
    listAttendanceController,
} from "@/infra/http/controllers/attendance";
import { Router } from "express";

const AttendancesRoutes = Router();

AttendancesRoutes.get("/", (request, response, next) => {
    return listAttendanceController.handle(request, response, next);
});

AttendancesRoutes.put("/:attendanceId", (request, response, next) => {
    return editFirstTimeController.handle(request, response, next);
});



AttendancesRoutes.put("/lunchStart/:id", (request, response, next) => {
    return editLunchStartAttendanceController.handle(request, response, next);
});


AttendancesRoutes.put("/lunchEnd/:id", (request, response, next) => {
    return editLunchEndAttendanceController.handle(request, response, next);
});

AttendancesRoutes.put("/clockedOut/:id", (request, response, next) => {
    return editClockedOutAttendanceController.handle(request, response, next);
});
AttendancesRoutes.get("/employee/:id", (request, response, next) => {
    return getSchedulesByEmployeeIdController.handle(request, response, next);
})
export { AttendancesRoutes };

