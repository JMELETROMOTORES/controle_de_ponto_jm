import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { ListEmployeeUseCase } from "@/domain/employee/use-cases/fetch-employees";

import { EmployeePresenter } from "@/infra/database/presenters/employee-presenter";
import { NextFunction, Request, Response } from "express";

export class ListEmployeeController implements IController {
    constructor(private readonly listEmployeeUseCase: ListEmployeeUseCase) {}

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

            const result = await this.listEmployeeUseCase.execute({
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

            const employee: EmployeePresenter[] = result.value.result.map(
                (employee) => EmployeePresenter.toHTTP(employee),
            );

            return response.status(HttpStatusCode.OK).json({
                result: employee,

                totalRegisters: result.value.totalRegisters,
                totalPages: result.value.totalPages,
                currentPage: result.value.currentPage,
            });
        } catch (error) {
            next(error);
        }
    }
}

