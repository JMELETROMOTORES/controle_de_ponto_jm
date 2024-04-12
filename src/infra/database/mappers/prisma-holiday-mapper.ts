import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Holiday } from "@/domain/holidays/entities/holiday";


import { Prisma, holiday as PrismaHoliday } from "@prisma/client";

export class PrismaholidayMapper {
    static toDomain(raw: PrismaHoliday): Holiday {
        return Holiday.create(
            {
                reason: raw.reason,
                date: raw.date,
              
            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPrisma(holiday: Holiday): Prisma.holidayUncheckedCreateInput {
        return {
            id: holiday.id.toString(),
            reason: holiday.reason,
            date: holiday.date,
        };
    }
}

