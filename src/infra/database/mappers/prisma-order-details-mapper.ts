import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
    IOrderDetailsProps,
    OrderDetails,
} from "@/domain/orders/entities/value-objects/order-details";
import { IUserProps } from "@/domain/users/entities/User";
import { Order as PrismaOrder } from "@prisma/client";

export interface IOrderPrisma extends Omit<PrismaOrder, "itens"> {
    itens: IOrderDetailsProps[];
    user: IUserProps;
}

export class PrismaOrderDetailsMapper {
    static toDomain(raw: IOrderPrisma): OrderDetails {
        return OrderDetails.create({
            orderId: new UniqueEntityID(raw.id),
            user: {
                id: new UniqueEntityID(raw.userId),
                name: raw.user.name,
                email: raw.user.email,
            },
            itens: raw.itens.map((item) => ({
                quantity: item.quantity,
                price: item.price,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.price,
                },
            })),
            adress: raw.adress,
            status: raw.status,
            total: raw.total,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}

