import { User } from "@/domain/users/entities/User";
import {
    IListUsersRequest,
    IListUsersResponse,
    UserRepository,
} from "@/domain/users/repositories/user-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

class UserPrismaRepository implements UserRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }

    async findByMail(email: string): Promise<User | null> {
        const usersP = await this.prismaClient.user.findFirst({
            where: {
                email,
            },
        });
        if (!usersP) {
            return null;
        }

        return PrismaUserMapper.toDomain(usersP);
    }

    async create(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user);

        await this.prismaClient.user.create({ data });
    }

    async list({
        search,
        limit,
        offset,
    }: IListUsersRequest): Promise<IListUsersResponse | null> {
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

        const count = await this.prismaClient.user.count({
            where,
        });

        const usersP = await this.prismaClient.user.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!usersP) return null;

        const users = await Promise.all(
            usersP.map(async (userP) => {
                return PrismaUserMapper.toDomain(userP);
            }),
        );

        return {
            users,
            count,
        };
    }
}

export { UserPrismaRepository };

