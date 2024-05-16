import { IController } from "@/core/protocols/IController";
import { DeleteAttendanceUseCase } from "@/domain/attendances/use-cases/delete-attendance-controller";
import { NextFunction, Request, Response } from "express";

class DeleteAttendanceController implements IController {
  constructor(private readonly useCase: DeleteAttendanceUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this.useCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  } 
}

export { DeleteAttendanceController };