import { IController } from "@/core/protocols/IController";

import { RegisterUserUseCase } from "@/domain/users/use-cases/register-user";
import { UserPresenter } from "@/infra/database/presenters/user-presenter";
import { NextFunction, Request, Response } from "express";

export { CreateUserController };

class CreateUserController implements IController {
    constructor(private readonly useCase: RegisterUserUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, email, password, role } = request.body;

            const result = await this.useCase.execute({
                name,
                email,
                password,
                role,
            });

            if (result.isLeft()) return response.status(409).json(result.value);

            return response
                .status(201)
                .json(UserPresenter.toHTTP(result.value?.user));
        } catch (error) {
            next(error);
        }
    }
}

