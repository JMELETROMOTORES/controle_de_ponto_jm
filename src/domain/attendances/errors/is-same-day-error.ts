import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class IsSameDayError extends ErrorHandler {
    constructor() {
        super(
            `this time cannot be before or after the current date`,
            HttpStatusCode.NOT_ACCEPTABLE,
        );
    }
}

