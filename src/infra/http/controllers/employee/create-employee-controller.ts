import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { CreateEmployeeUseCase } from "@/domain/employee/use-cases/create-employee";
import { EmployeePresenter } from "@/infra/database/presenters/employee-presenter";

import { NextFunction, Request, Response } from "express";

export { CreateEmployeeController };

class CreateEmployeeController implements IController {
    constructor(private readonly useCase: CreateEmployeeUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, position, rfid, imgUrl, journeyId } = request.body;

            const result = await this.useCase.execute({
                name,
                position,
                rfid,
                imgUrl,
                journeyId,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.CREATED)
                .json(EmployeePresenter.toHTTP(result.value?.employee));
        } catch (error) {
            next(error);
        }
    }
}

