import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { EditJourneyUseCase } from "@/domain/journey/use-cases/edit-journey";

import { JourneyPresenter } from "@/infra/database/presenters/journey-presenter";

import { NextFunction, Request, Response } from "express";

export { EditJourneyController };

class EditJourneyController implements IController {
    constructor(private readonly useCase: EditJourneyUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { name, start_date, end_date, lunch_time_tolerance } =
                request.body;

            const result = await this.useCase.execute({
                id,
                name,
                start_date,
                end_date,
                lunch_time_tolerance,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(JourneyPresenter.toHTTP(result.value?.journey));
        } catch (error) {
            next(error);
        }
    }
}

