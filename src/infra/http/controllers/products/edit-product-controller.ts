import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { EditProductUseCase } from "@/domain/products/use-cases/edit-product";
import { ProductPresenter } from "@/infra/database/presenters/product-presenter";

import { NextFunction, Request, Response } from "express";

export { EditProductController };

class EditProductController implements IController {
    constructor(private readonly useCase: EditProductUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { id } = request.params;
            const { name, description, price, inStock } = request.body;

            const result = await this.useCase.execute({
                id,
                name,
                description,
                price,
                inStock,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json(result.value);

            return response
                .status(HttpStatusCode.OK)
                .json(ProductPresenter.toHTTP(result.value?.product));
        } catch (error) {
            next(error);
        }
    }
}

