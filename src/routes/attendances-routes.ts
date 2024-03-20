import {
    editFirstTimeController,
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

AttendancesRoutes.put("/:attendanceId", (request, response, next) => {
    return editFirstTimeController.handle(request, response, next);
});

export { AttendancesRoutes };

