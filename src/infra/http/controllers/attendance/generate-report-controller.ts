import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { EditFirstTimeUseCase } from "@/domain/attendances/use-cases/edit-firts-time";
import {  GenerateReportUseCase } from "@/domain/attendances/use-cases/generate-report";

import { AttendancePresenter } from "@/infra/database/presenters/attendance-presenter";
import { ReportPresenter } from "@/infra/database/presenters/report-presenter";

import { NextFunction, Request, Response } from "express";

class GenerateReportController implements IController {
    constructor(private readonly useCase: GenerateReportUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
      
            const { rfid, startDate, endDate } = request.params;

            const result = await this.useCase.execute({
                rfid,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(ReportPresenter.toHTTP(result.value?.report));
        } catch (error) {
            next(error);
        }
    }
}

export { GenerateReportController };

