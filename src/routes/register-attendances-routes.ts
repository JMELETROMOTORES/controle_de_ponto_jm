import {
    deleteLunchEndController,
    deleteLunchStartController,
    registerClockedInAttendanceController,
    registerClockedOutAttendanceController,
    registerLunchEndAttendanceController,
    registerLunchStartAttendanceController,
} from "@/infra/http/controllers/attendance";
import { Router } from "express";

const SchedulesAttendancesRoutes = Router();

SchedulesAttendancesRoutes.post("/clockedIn", (request, response, next) => {
    return registerClockedInAttendanceController.handle(
        request,
        response,
        next,
    );
});

SchedulesAttendancesRoutes.post("/lunchstart", (request, response, next) => {
    return registerLunchStartAttendanceController.handle(
        request,
        response,
        next,
    );
});

SchedulesAttendancesRoutes.put(
    "/lunchstart/delete/:id",
    (request, response, next) => {
        return deleteLunchStartController.handle(request, response, next);
    },
);

SchedulesAttendancesRoutes.put(
    "/lunchend/delete/:id",
    (request, response, next) => {
        return deleteLunchEndController.handle(request, response, next);
    },
);

SchedulesAttendancesRoutes.post("/lunchend", (request, response, next) => {
    return registerLunchEndAttendanceController.handle(request, response, next);
});

SchedulesAttendancesRoutes.post("/clockedOut", (request, response, next) => {
    return registerClockedOutAttendanceController.handle(
        request,
        response,
        next,
    );
});

export { SchedulesAttendancesRoutes };

