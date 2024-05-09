import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class EmployeeNotFoundError extends ErrorHandler {
    constructor() {
        super(`Employee not found`, HttpStatusCode.NOT_FOUND);
    }
}

