import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { ListAttendanceUseCase } from "@/domain/attendances/use-cases/fetch-attendances";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { NextFunction, Request, Response } from "express";

export class ListAttendanceController implements IController {
    constructor(
        private readonly listAttendanceUseCase: ListAttendanceUseCase,
    ) {}

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

            const result = await this.listAttendanceUseCase.execute({
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

            const attendance: AttendancePresenter[] = result.value.result.map(
                (attendance) => AttendancePresenter.toHTTP(attendance),
            );

            return response.status(HttpStatusCode.OK).json({
                result: attendance,

                totalRegisters: result.value.totalRegisters,
                totalPages: result.value.totalPages,
                currentPage: result.value.currentPage,
            });
        } catch (error) {
            next(error);
        }
    }
}

