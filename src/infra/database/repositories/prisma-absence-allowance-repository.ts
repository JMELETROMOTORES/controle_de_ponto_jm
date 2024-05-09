import { AbsenceAllowance } from "@/domain/absence-allowance/entities/absence-allowance";
import { AbsenceAllowanceRepository, IListAbsenceAllowancesRequest, IListAbsenceAllowancesResponse } from "@/domain/absence-allowance/repositories/absence-allowance-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaAbsenceAllowanceMapper } from "../mappers/prisma-absence-allowance-mapper";

class AbsenceAllowancePrismaRepository implements AbsenceAllowanceRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }



    async findById(id: string): Promise<AbsenceAllowance | null> {
        const absenceallowancesP = await this.prismaClient.absenceAllowance.findFirst({
            where: {
                id,
            },
        });
        if (!absenceallowancesP) {
            return null;
        }

        return PrismaAbsenceAllowanceMapper.toDomain(absenceallowancesP);
    }

    async create(absenceallowance: AbsenceAllowance): Promise<void> {
        const data = PrismaAbsenceAllowanceMapper.toPrisma(absenceallowance);

        await this.prismaClient.absenceAllowance.create({ data });
    }

    async save(absenceallowance: AbsenceAllowance): Promise<void> {
        const data = PrismaAbsenceAllowanceMapper.toPrisma(absenceallowance);

        await this.prismaClient.absenceAllowance.update({
            where: {
                id: absenceallowance.id.toString(),
            },
            data,
        });
    }

    async delete(absenceallowance: AbsenceAllowance): Promise<void> {
        await this.prismaClient.absenceAllowance.delete({
            where: {
                id: absenceallowance.id.toString(),
            },
        });
    }

    async findByEmployeeId(employeeId: string): Promise<AbsenceAllowance[] | null> {
        const absenceallowancesP = await this.prismaClient.absenceAllowance.findMany({
            where: {
                employeeId,
            },
        });
        if (!absenceallowancesP) {
            return null;
        }

        return absenceallowancesP.map((absenceallowanceP) => PrismaAbsenceAllowanceMapper.toDomain(absenceallowanceP));
    }
    async list({
        search,
        limit,
        offset,
    }: IListAbsenceAllowancesRequest): Promise<IListAbsenceAllowancesResponse | null> {
        const where = search
            ? {
                  OR: [
                      {
                          reason: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.absenceAllowance.count({
            where,
        });

        const absenceallowancesP = await this.prismaClient.absenceAllowance.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!absenceallowancesP) return null;

        const absenceallowances = await Promise.all(
            absenceallowancesP.map(async (absenceallowanceP) => {
                return PrismaAbsenceAllowanceMapper.toDomain(absenceallowanceP);
            }),
        );

        return {
            absenceallowances,
            count,
        };
    }
}

export { AbsenceAllowancePrismaRepository };

