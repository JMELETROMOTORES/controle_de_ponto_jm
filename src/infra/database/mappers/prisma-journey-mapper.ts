import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Journey } from "@/domain/journey/entities/journey";

import { Prisma, Journey as PrismaJourney } from "@prisma/client";

export class PrismaJourneyMapper {
    static toDomain(raw: PrismaJourney): Journey {
        return Journey.create(
            {
                name: raw.name,
                start_date: raw.start_date,
                start_date_toleranceDelay: raw.start_date_toleranceDelay,
                end_date: raw.end_date,
                lunch_time_tolerance: raw.lunch_time_tolerance,
                start_date_toleranceExtraTime:
                    raw.start_date_toleranceExtraTime,
                friday_end_date: raw.friday_end_date,
                friday_end_date_toleranceExtraTime: raw.friday_end_date_toleranceExtraTime,
                end_date_toleranceExtraTime: raw.end_date_toleranceExtraTime,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPrisma(journey: Journey): Prisma.JourneyUncheckedCreateInput {
        return {
            id: journey.id.toString(),
            name: journey.name,
            start_date: journey.start_date,
            start_date_toleranceDelay: journey.start_date_toleranceDelay,
            end_date: journey.end_date,
            lunch_time_tolerance: journey.lunch_time_tolerance,
            start_date_toleranceExtraTime:
                journey.start_date_toleranceExtraTime,
            friday_end_date: journey.friday_end_date,
            friday_end_date_toleranceExtraTime: journey.friday_end_date_toleranceExtraTime,
            end_date_toleranceExtraTime: journey.end_date_toleranceExtraTime,
            createdAt: journey.createdAt,
            updatedAt: journey.updatedAt,
        };
    }
}
