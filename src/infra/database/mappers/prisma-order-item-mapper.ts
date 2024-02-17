import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { OrderItem } from "@/domain/orders/entities/order-item";

import { Prisma, OrderItem as PrismaOrderItem } from "@prisma/client";

export class PrismaOrderItemMapper {
    public static toDomain(data: PrismaOrderItem): OrderItem {
        return OrderItem.create(
            {
                productId: new UniqueEntityID(data.productId),
                quantity: data.quantity,
                price: data.price,
                orderId: new UniqueEntityID(data.orderId),
                createdAt: data.createdAt,
            },
            new UniqueEntityID(data.id),
        );
    }

    public static toPersistence(
        orderItem: OrderItem,
    ): Prisma.OrderItemUncheckedCreateInput {
        return {
            id: orderItem.id.toString(),
            productId: orderItem.productId.toString(),
            quantity: orderItem.quantity,
            price: orderItem.price,
            orderId: orderItem.orderId.toString(),
            createdAt: orderItem.createdAt,
            updatedAt: new Date(),
        };
    }
}

