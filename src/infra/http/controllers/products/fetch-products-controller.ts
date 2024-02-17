import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { IController } from "@/core/protocols/IController";

import { ListProductsUseCase } from "@/domain/products/use-cases/fetch-products";
import { ProductPresenter } from "@/infra/database/presenters/product-presenter";
import { NextFunction, Request, Response } from "express";

export class ListProductsController implements IController {
    constructor(private readonly listProductsUseCase: ListProductsUseCase) {}

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

            const result = await this.listProductsUseCase.execute({
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

            const products: ProductPresenter[] = result.value.result.map(
                (product) => ProductPresenter.toHTTP(product),
            );

            return response.status(HttpStatusCode.OK).json({
                result: products,

                totalRegisters: result.value.totalRegisters,
                totalPages: result.value.totalPages,
                currentPage: result.value.currentPage,
            });
        } catch (error) {
            next(error);
        }
    }
}

