import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class WrongCredentialsError extends ErrorHandler {
    constructor() {
        super("Credentials are not valid.", HttpStatusCode.UNAUTHORIZED);
    }
}

