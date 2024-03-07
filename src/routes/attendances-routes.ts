import {
    editAttendanceController,
    listAttendanceController,
} from "@/infra/http/controllers/attendance";
import { Router } from "express";

const AttendancesRoutes = Router();

AttendancesRoutes.get("/", (request, response, next) => {
    return listAttendanceController.handle(request, response, next);
});

AttendancesRoutes.put("/:id", (request, response, next) => {
    return editAttendanceController.handle(request, response, next);
});

export { AttendancesRoutes };

