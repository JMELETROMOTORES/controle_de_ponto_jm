import { IController } from "@/core/protocols/IController";
import { AuthenticateUserUseCase } from "@/domain/users/use-cases/authenticate-user";
import { NextFunction, Request, Response } from "express";

class AuthenticateUserController implements IController {
    constructor(private readonly useCase: AuthenticateUserUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { email, password } = request.body;

            const result = await this.useCase.execute({
                email,
                password,
            });
            if (result.isLeft()) return response.status(401).json(result.value);

            return response.status(200).json(result.value);
        } catch (error) {
            next(error);
        }
    }
}

export { AuthenticateUserController };

