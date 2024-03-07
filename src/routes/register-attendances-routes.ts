import {
    registerClockedInAttendanceController,
    registerClockedOutAttendanceController,
    registerLunchEndAttendanceController,
    registerLunchStartAttendanceController,
} from "@/infra/http/controllers/attendance";
import { Router } from "express";

const RegisterAttendancesRoutes = Router();

RegisterAttendancesRoutes.post("/", (request, response, next) => {
    return registerClockedInAttendanceController.handle(
        request,
        response,
        next,
    );
});

RegisterAttendancesRoutes.put("/lunchstart/:id", (request, response, next) => {
    return registerLunchStartAttendanceController.handle(
        request,
        response,
        next,
    );
});

RegisterAttendancesRoutes.put("/lunchend/:id", (request, response, next) => {
    return registerLunchEndAttendanceController.handle(request, response, next);
});

RegisterAttendancesRoutes.put("/clockedOut/:id", (request, response, next) => {
    return registerClockedOutAttendanceController.handle(
        request,
        response,
        next,
    );
});

export { RegisterAttendancesRoutes };

