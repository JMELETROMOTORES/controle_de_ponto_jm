import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Product } from "@/domain/products/entities/Product";
import { Prisma, Product as PrismaProduct } from "@prisma/client";

export class PrismaProductMapper {
    static toDomain(raw: PrismaProduct): Product {
        return Product.create(
            {
                name: raw.name,
                description: raw.description,
                price: raw.price,
                inStock: raw.inStock,
            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
        return {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            inStock: product.inStock,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

