import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { DeleteClockedOutUseCase } from "@/domain/attendances/use-cases/delete-clocked-out";
import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { NextFunction, Request, Response } from "express";

class DeleteClockedOutController implements IController {
    constructor(private readonly useCase: DeleteClockedOutUseCase) {}
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const result = await this.useCase.execute(id);

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(AttendancePresenter.toHTTP(result.value?.attendance));
        } catch (error) {
            next(error);
        }
    }
}

export { DeleteClockedOutController };

