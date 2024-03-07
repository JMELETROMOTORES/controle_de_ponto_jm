import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class NotFoundError extends ErrorHandler {
    constructor() {
        super(`Journey not found`, HttpStatusCode.NOT_FOUND);
    }
}

