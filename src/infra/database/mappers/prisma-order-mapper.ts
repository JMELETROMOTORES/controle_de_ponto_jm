import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Order, Status } from "@/domain/orders/entities/order";

import { OrderStatus, Prisma, Order as PrismaOrder } from "@prisma/client";

export class PrismaOrderMapper {
    static toDomain(raw: PrismaOrder): Order {
        return Order.create(
            {
                userId: new UniqueEntityID(raw.userId),
                status: raw.status as Status,
                adress: raw.adress,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPersistence(order: Order): Prisma.OrderUncheckedCreateInput {
        return {
            id: order.id.toString(),
            userId: order.userId.toString(),
            status: order.status as OrderStatus,
            total: order.total as number,
            adress: order.adress,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt as Date | string,
        };
    }
}

