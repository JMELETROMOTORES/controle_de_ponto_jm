import { IController } from "@/core/protocols/IController";
import { CreateHolidayUseCase } from "@/domain/holidays/use-cases/create-holiday";

import { HolidayPresenter } from "@/infra/database/presenters/holiday-presenter";
import { NextFunction, Request, Response } from "express";

export { CreateHolidayController };

class CreateHolidayController implements IController {
	constructor(private readonly useCase: CreateHolidayUseCase) {}

	async handle(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<void | Response<any, Record<string, any>>> {
		try {
			const { reason, date } = request.body;

			const result = await this.useCase.execute({
				reason,
				date,
			});

			if (result.isLeft()) return response.status(409).json(result.value);

			return response.status(201).json(HolidayPresenter.toHTTP(result.value?.holiday));
		} catch (error) {
			next(error);
		}
	}
}
