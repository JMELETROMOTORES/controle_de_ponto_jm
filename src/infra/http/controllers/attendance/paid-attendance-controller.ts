import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { PaidAttendanceUseCase } from "@/domain/attendances/use-cases/paid-attendance";
import { RegisterFirstTimeInAttendanceUseCase } from "@/domain/attendances/use-cases/rfid-register-first-time";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { NextFunction, Request, Response } from "express";

class PaidAttendanceController implements IController {
    constructor(
        private readonly useCase: PaidAttendanceUseCase,
    ) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { rfid, date, absenseReason } = request.body;

            const result = await this.useCase.execute({
                rfid,
                date,
                absenseReason
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.CREATED)
                .json({ result });
        } catch (error) {
            next(error);
        }
    }
}
export { PaidAttendanceController };

