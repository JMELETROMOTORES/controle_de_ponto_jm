import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class EmployeeNotHaveAJourney extends ErrorHandler {
    constructor() {
        super(
            `this employee does not have a journey`,
            HttpStatusCode.BAD_REQUEST,
        );
    }
}

