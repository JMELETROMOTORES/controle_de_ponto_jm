import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class NotFoundEmployeeError extends ErrorHandler {
    constructor() {
        super(`Employee not found`, HttpStatusCode.NOT_FOUND);
    }
}

