import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { GetEmployeeUseCase } from "@/domain/employee/use-cases/get-employee-by-id";

import { EmployeePresenter } from "@/infra/database/presenters/employee-presenter";

import { NextFunction, Request, Response } from "express";

class GetEmployeeController implements IController {
    constructor(private readonly useCase: GetEmployeeUseCase) {}

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
                    .status(HttpStatusCode.NOT_FOUND)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(EmployeePresenter.toHTTP(result.value?.employee));
        } catch (error) {
            next(error);
        }
    }
}

export { GetEmployeeController };

