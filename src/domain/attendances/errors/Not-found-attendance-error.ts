import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class NotFoundAttendanceError extends ErrorHandler {
    constructor() {
        super(`Attendance not found`, HttpStatusCode.NOT_FOUND);
    }
}

