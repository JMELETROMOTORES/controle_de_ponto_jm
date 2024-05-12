import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { DeleteHolidayUseCase } from "@/domain/holidays/use-cases/delete-holiday";
import { HolidayPresenter } from "@/infra/database/presenters/holiday-presenter";


import { NextFunction, Request, Response } from "express";

export { DeleteHolidayController };

class DeleteHolidayController implements IController {
    constructor(private readonly useCase: DeleteHolidayUseCase) {}

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

                    return response
                    .status(201)
                    .json(HolidayPresenter.toHTTP(result.value?.result));
        } catch (error) {
            next(error);
        }
    }
}

