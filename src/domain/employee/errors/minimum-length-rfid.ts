import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class MinimunLengthRfidError extends ErrorHandler {
    constructor() {
        super(`RFID needs to be greater than 10`, HttpStatusCode.NOT_FOUND);
    }
}

