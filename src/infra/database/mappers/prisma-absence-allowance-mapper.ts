import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AbsenceAllowance } from "@/domain/absence-allowance/entities/absence-allowance";

import { Prisma, absenceAllowance as PrismaAbsenceAllowance } from "@prisma/client";

export class PrismaAbsenceAllowanceMapper {
    static toDomain(raw: PrismaAbsenceAllowance): AbsenceAllowance {
        return AbsenceAllowance.create(
            { 
                employeeId: raw.employeeId,
                reason: raw.reason,
                date: raw.date,

            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPrisma(absenceallowance: AbsenceAllowance): Prisma.absenceAllowanceUncheckedCreateInput {
        return {
            id: absenceallowance.id.toString(),
            reason: absenceallowance.reason,
            date: absenceallowance.date,
            employeeId: absenceallowance.employeeId,
            createdAt: absenceallowance.createdAt,
            updatedAt: absenceallowance.updatedAt,
        };
    }
}

