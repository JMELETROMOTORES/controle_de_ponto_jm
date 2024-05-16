import { IController } from "@/core/protocols/IController";
import { IntegrationSchedulesUseCase } from "@/domain/attendances/use-cases/ingration-schedules";
import { NextFunction, Request, Response } from "express";

class IntegrationSchedulesController implements IController {
  constructor(private readonly useCase: IntegrationSchedulesUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction): 
  Promise<void | Response<any, Record<string, any>>> {
    try { 
      const { employeeRfid } = request.params;

      const result = await this.useCase.execute(employeeRfid);

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { IntegrationSchedulesController };