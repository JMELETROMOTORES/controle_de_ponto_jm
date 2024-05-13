import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class ScheduleAlreadyExist extends ErrorHandler {
    constructor() {
        super(
            `Horario ja registrado`,
            HttpStatusCode.NOT_ACCEPTABLE,
        );
    }
}

