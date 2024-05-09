import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { GetSchedulesByEmployeeIdUseCase } from "@/domain/attendances/use-cases/get-attendances-by-employee-id";
import { RegisterClockedOutAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-clocked-out";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { AttendanceEmployeePresenter } from "@/infra/database/presenters/attendance-with-employees-presenter";
import { NextFunction, Request, Response } from "express";

class GetSchedulesByEmployeeIdController implements IController {
    constructor(
        private readonly useCase: GetSchedulesByEmployeeIdUseCase,
    ) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;

            const result = await this.useCase.execute({
                id,

            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);


                    const attendance: AttendanceEmployeePresenter[] = result.value.attendances.map(
                      (attendance) => AttendanceEmployeePresenter.toHTTP(attendance),
                  );
            return response
                .status(HttpStatusCode.CREATED)
                .json(attendance);
        } catch (error) {
            next(error);
        }
    }
}
export { GetSchedulesByEmployeeIdController };

