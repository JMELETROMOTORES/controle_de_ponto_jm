import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { EditEmployeeUseCase } from "@/domain/employee/use-cases/edit-employee";

import { EmployeePresenter } from "@/infra/database/presenters/employee-presenter";

import { NextFunction, Request, Response } from "express";

export { EditEmployeeController };

class EditEmployeeController implements IController {
    constructor(private readonly useCase: EditEmployeeUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { name, position, imgUrl, rfid, journeyId } = request.body;

            const result = await this.useCase.execute({
                id,
                name,
                position,
                imgUrl,
                rfid,
                journeyId,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(EmployeePresenter.toHTTP(result.value?.employee));
        } catch (error) {
            next(error);
        }
    }
}

