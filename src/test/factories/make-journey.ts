import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Journey, JourneyProps } from "@/domain/journey/entities/journey";
// import { PrismaJourneyMapper } from "@/infra/database/mappers/prisma-journey-mapper";
import { PrismaClient } from "@prisma/client";

export function makeJourney(
    override: Partial<JourneyProps> = {},
    id?: UniqueEntityID,
) {
    const journey = Journey.create(
        {
            name: "jornada padrão",
            start_date: "08:00",
            start_date_toleranceDelay: "08:10",
            end_date: "18:10",
            lunch_time_tolerance: 60,
            start_date_toleranceExtraTime: "07:50",
            end_date_toleranceExtraTime: "18:10",
            friday_end_date: "17:10",
            friday_end_date_toleranceExtraTime: "17:10",
            ...override,
        },
        id,
    );
    return journey;
}

// export class JourneyFactory {
//     constructor(private prisma: PrismaClient) {}

//     async makePrismaJourney(data: Partial<JourneyProps> = {}) {
//         const journey = makeJourney(data);

//         await this.prisma.journey.create({
//             data: PrismaJourneyMapper.toPrisma(journey),
//         });
//         return journey;
//     }
// }

