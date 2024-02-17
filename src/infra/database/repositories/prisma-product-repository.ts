import { Product } from "@/domain/products/entities/Product";
import {
    IListProductsRequest,
    IListProductsResponse,
    ProductRepository,
} from "@/domain/products/repositories/product-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";

class ProductPrismaRepository implements ProductRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }

    async findById(id: string): Promise<Product | null> {
        const productsP = await this.prismaClient.product.findFirst({
            where: {
                id,
            },
        });
        if (!productsP) {
            return null;
        }

        return PrismaProductMapper.toDomain(productsP);
    }

    async create(product: Product): Promise<void> {
        const data = PrismaProductMapper.toPrisma(product);

        await this.prismaClient.product.create({ data });
    }

    async save(product: Product): Promise<void> {
        const data = PrismaProductMapper.toPrisma(product);

        await this.prismaClient.product.update({
            where: {
                id: product.id.toString(),
            },
            data,
        });
    }

    async delete(product: Product): Promise<void> {
        await this.prismaClient.product.delete({
            where: {
                id: product.id.toString(),
            },
        });
    }

    async list({
        search,
        limit,
        offset,
    }: IListProductsRequest): Promise<IListProductsResponse | null> {
        const where = search
            ? {
                  OR: [
                      {
                          name: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.product.count({
            where,
        });

        const productsP = await this.prismaClient.product.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!productsP) return null;

        const products = await Promise.all(
            productsP.map(async (productP) => {
                return PrismaProductMapper.toDomain(productP);
            }),
        );

        return {
            products,
            count,
        };
    }
}

export { ProductPrismaRepository };

