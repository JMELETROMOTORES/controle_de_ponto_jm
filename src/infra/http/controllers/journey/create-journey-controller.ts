import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { CreateJourneyUseCase } from "@/domain/journey/use-cases/create-journey";
import { JourneyPresenter } from "@/infra/database/presenters/journey-presenter";

import { NextFunction, Request, Response } from "express";

export { CreateJourneyController };

class CreateJourneyController implements IController {
    constructor(private readonly useCase: CreateJourneyUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const {
                name,
                start_date,
                end_date,
                lunch_time_tolerance,
                start_date_toleranceExtraTime,
                end_date_toleranceExtraTime,
            } = request.body;

            const result = await this.useCase.execute({
                name,
                start_date,
                end_date,
                lunch_time_tolerance,
                start_date_toleranceExtraTime,
                end_date_toleranceExtraTime,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.CREATED)
                .json(JourneyPresenter.toHTTP(result.value?.journey));
        } catch (error) {
            next(error);
        }
    }
}

