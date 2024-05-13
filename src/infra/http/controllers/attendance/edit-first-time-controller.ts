import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { EditFirstTimeUseCase } from "@/domain/attendances/use-cases/edit-firts-time";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";

import { NextFunction, Request, Response } from "express";

class EditFirstTimeController implements IController {
    constructor(private readonly useCase: EditFirstTimeUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { attendanceId } = request.params;
            const { rfid, clockedIn } = request.body;

            const result = await this.useCase.execute({
                attendanceId,
                clockedIn,
                rfid,
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

export { EditFirstTimeController };

