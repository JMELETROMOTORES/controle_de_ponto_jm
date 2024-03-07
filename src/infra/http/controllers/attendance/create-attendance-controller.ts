import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { RegisterFirstTimeInAttendanceUseCase } from "@/domain/attendances/use-cases/rfid-register-first-time";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { NextFunction, Request, Response } from "express";

class RegisterClockedInAttendanceController implements IController {
    constructor(
        private readonly useCase: RegisterFirstTimeInAttendanceUseCase,
    ) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { rfid, clockedIn } = request.body;

            const result = await this.useCase.execute({
                rfid,
                clockedIn,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.CREATED)
                .json(AttendancePresenter.toHTTP(result.value?.attendance));
        } catch (error) {
            next(error);
        }
    }
}
export { RegisterClockedInAttendanceController };

