import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { RegisterClockedOutAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-clocked-out";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { NextFunction, Request, Response } from "express";

class RegisterClockedOutAttendanceController implements IController {
    constructor(
        private readonly useCase: RegisterClockedOutAttendanceUseCase,
    ) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { rfid, clockedOut } = request.body;

            const result = await this.useCase.execute({
                id,
                rfid,
                clockedOut,
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
export { RegisterClockedOutAttendanceController };

