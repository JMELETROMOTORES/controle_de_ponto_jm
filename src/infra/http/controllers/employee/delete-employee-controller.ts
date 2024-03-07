import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { DeleteEmployeeUseCase } from "@/domain/employee/use-cases/delete-employee";

import { NextFunction, Request, Response } from "express";

export { DeleteEmployeeController };

class DeleteEmployeeController implements IController {
    constructor(private readonly useCase: DeleteEmployeeUseCase) {}

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
                    .status(HttpStatusCode.NOT_FOUND)
                    .json(result.value);

            return response.status(HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    }
}

