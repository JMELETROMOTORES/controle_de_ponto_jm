import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { ListHolidayUseCase } from "@/domain/holidays/use-cases/fetch-holidays";


import { HolidayPresenter } from "@/infra/database/presenters/holiday-presenter";
import { NextFunction, Request, Response } from "express";

export class ListHolidayController implements IController {
    constructor(private readonly listHolidayUseCase: ListHolidayUseCase) {}

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

            const result = await this.listHolidayUseCase.execute({
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

            const holiday: HolidayPresenter[] = result.value.result.map(
                (holiday) => HolidayPresenter.toHTTP(holiday),
            );

            return response.status(HttpStatusCode.OK).json({
                result: holiday,

                totalRegisters: result.value.totalRegisters,
                totalPages: result.value.totalPages,
                currentPage: result.value.currentPage,
            });
        } catch (error) {
            next(error);
        }
    }
}

