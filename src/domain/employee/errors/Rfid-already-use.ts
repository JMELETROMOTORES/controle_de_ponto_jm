import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class RfidAlreadyUseError extends ErrorHandler {
    constructor() {
        super(`RFID is already in use`, HttpStatusCode.NOT_FOUND);
    }
}

