import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class UserAlreadyExistsError extends ErrorHandler {
    constructor() {
        super(`E-mail already registered`, HttpStatusCode.CONFLICT);
    }
}

