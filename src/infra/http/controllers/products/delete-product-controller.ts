import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { DeleteProductUseCase } from "@/domain/products/use-cases/delete-product";
import { ProductPresenter } from "@/infra/database/presenters/product-presenter";

import { NextFunction, Request, Response } from "express";

export { DeleteProductController };

class DeleteProductController implements IController {
    constructor(private readonly useCase: DeleteProductUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;

            const result = await this.useCase.execute({
                id,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_FOUND)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(ProductPresenter.toHTTP(result.value?.product));
        } catch (error) {
            next(error);
        }
    }
}

