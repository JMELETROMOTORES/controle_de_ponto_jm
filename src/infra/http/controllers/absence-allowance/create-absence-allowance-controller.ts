import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { CreateAbsenceAllowanceUseCase } from "@/domain/absence-allowance/use-cases/create-absence-allowance";
import { AbsenceAllowancePresenter } from "@/infra/database/presenters/absence-allowance-preseter";


import { NextFunction, Request, Response } from "express";

export { CreateAbsenceAllowanceController };

class CreateAbsenceAllowanceController implements IController {
    constructor(private readonly useCase: CreateAbsenceAllowanceUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { reason, employeeId, date } = request.body;

            const result = await this.useCase.execute({
                reason,
                employeeId,
                date
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.CREATED)
                .json(AbsenceAllowancePresenter.toHTTP(result.value?.absenceallowance));
        } catch (error) {
            next(error);
        }
    }
}

