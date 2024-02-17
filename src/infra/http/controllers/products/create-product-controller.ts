import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";
import { CreateProductUseCase } from "@/domain/products/use-cases/create-product";
import { ProductPresenter } from "@/infra/database/presenters/product-presenter";

import { NextFunction, Request, Response } from "express";

export { CreateProductController };

class CreateProductController implements IController {
    constructor(private readonly useCase: CreateProductUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, description, price, inStock } = request.body;

            const result = await this.useCase.execute({
                name,
                description,
                price,
                inStock,
            });

            if (result.isLeft())
                return response
                    .status(HttpStatusCode.NOT_ACCEPTABLE)
                    .json(result.value);

            return response
                .status(HttpStatusCode.CREATED)
                .json(ProductPresenter.toHTTP(result.value?.product));
        } catch (error) {
            next(error);
        }
    }
}

