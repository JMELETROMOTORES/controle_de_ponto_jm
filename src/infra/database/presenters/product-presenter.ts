import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface IProductPresenter {
    id: UniqueEntityID;
    name: string;
    description: string;
    price: number;
    inStock: number;
}

export class ProductPresenter {
    static toHTTP(product: IProductPresenter) {
        return {
            cod: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            inStock: product.inStock,
            createdAt: new Date(),
        };
    }
}

