import { Holiday } from "@/domain/holidays/entities/holiday";
import { HolidayRepository, IListHolidaysRequest, IListHolidaysResponse } from "@/domain/holidays/repositories/holiday-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaholidayMapper } from "../mappers/prisma-holiday-mapper";


class HolidayPrismaRepository implements HolidayRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }
async findHolidaysBetween(start: Date, end: Date): Promise<Holiday[]> {
    const holidaysP = await this.prismaClient.holiday.findMany({
        where: {
            date: {
                gte: start,
                lte: end,
            },
        },
    });

    if (!holidaysP) return [];

    return Promise.all(
        holidaysP.map(async (holidayP) => {
            return PrismaholidayMapper.toDomain(holidayP);
        }),
    );
  }
  
  async save(holiday: Holiday): Promise<void> {
    const data = PrismaholidayMapper.toPrisma(holiday);

    await this.prismaClient.holiday.update({
        where: {
            id: holiday.id.toString(),
        },
        data,
    });
  }

 async delete(holiday: Holiday): Promise<void> {
    await this.prismaClient.holiday.delete({
        where: {
            id: holiday.id.toString(),
        },
    });
}
  
    async create(holiday: Holiday): Promise<void> {
        const data = PrismaholidayMapper.toPrisma(holiday);

        await this.prismaClient.holiday.create({ data });
    }

    async findById(id: string): Promise<Holiday | null> {
        const holiday = await this.prismaClient.holiday.findFirst({
            where: {
                id,
            },
        });
        if (!holiday) {
            return null;
        }

        return PrismaholidayMapper.toDomain(holiday);
    }

    async list({
        search,
        limit,
        offset,
    }: IListHolidaysRequest): Promise<IListHolidaysResponse | null> {
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

        const count = await this.prismaClient.holiday.count({
            where,
        });

        const holidaysP = await this.prismaClient.holiday.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!holidaysP) return null;

        const holidays = await Promise.all(
            holidaysP.map(async (holidayP) => {
                return PrismaholidayMapper.toDomain(holidayP);
            }),
        );

        return {
            holidays,
            count,
        };
    }
}

export { HolidayPrismaRepository };

