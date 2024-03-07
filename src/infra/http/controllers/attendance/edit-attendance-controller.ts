import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { EditAttendanceUseCase } from "@/domain/attendances/use-cases/edit-attendance";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";

import { NextFunction, Request, Response } from "express";

export { EditAttendanceController };

class EditAttendanceController implements IController {
    constructor(private readonly useCase: EditAttendanceUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { clockedIn, lunchStart, lunchEnd, clockedOut } =
                request.body;

            const result = await this.useCase.execute({
                id,
                clockedIn,
                lunchStart,
                lunchEnd,
                clockedOut,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(AttendancePresenter.toHTTP(result.value?.attendance));
        } catch (error) {
            next(error);
        }
    }
}

