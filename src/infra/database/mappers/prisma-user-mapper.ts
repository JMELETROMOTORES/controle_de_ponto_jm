import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/users/entities/User";

import { Prisma, User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
    static toDomain(raw: PrismaUser): User {
        return User.create(
            {
                name: raw.name,
                email: raw.email,
                password: raw.password,
                role: raw.role,
            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        };
    }
}

