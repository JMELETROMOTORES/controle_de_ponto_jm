import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { RegisterLunchEndAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-lunch-end";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { NextFunction, Request, Response } from "express";

class RegisterLunchEndAttendanceController implements IController {
    constructor(private readonly useCase: RegisterLunchEndAttendanceUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { rfid, lunchEnd } = request.body;

            const result = await this.useCase.execute({
                id,
                rfid,
                lunchEnd,
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
export { RegisterLunchEndAttendanceController };

