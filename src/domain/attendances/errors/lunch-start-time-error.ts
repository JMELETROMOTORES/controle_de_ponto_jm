import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class LunchStartTimeError extends ErrorHandler {
    constructor() {
        super(
            `lunch start must be greater than the entry time`,
            HttpStatusCode.NOT_ACCEPTABLE,
        );
    }
}

