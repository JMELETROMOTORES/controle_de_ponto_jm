import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";

import { ListJourneyUseCase } from "@/domain/journey/use-cases/fetch-journey";
import { JourneyPresenter } from "@/infra/database/presenters/journey-presenter";
import { NextFunction, Request, Response } from "express";

export class ListJourneyController implements IController {
    constructor(private readonly listJourneyUseCase: ListJourneyUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const {
                q: search,
                p: page,
                l: limit,
                orderBy,
                orderMode,
            } = request.query;

            const result = await this.listJourneyUseCase.execute({
                search: search?.toString(),
                limit: limit ? Number(limit) : undefined,
                page: limit ? Number(page) : undefined,
                orderBy: orderBy?.toString(),
                orderMode: orderMode?.toString(),
            });

            if (result.isLeft()) {
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json(result.value);
            }

            const journey: JourneyPresenter[] = result.value.result.map(
                (journey) => JourneyPresenter.toHTTP(journey),
            );

            return response.status(HttpStatusCode.OK).json({
                result: journey,

                totalRegisters: result.value.totalRegisters,
                totalPages: result.value.totalPages,
                currentPage: result.value.currentPage,
            });
        } catch (error) {
            next(error);
        }
    }
}

