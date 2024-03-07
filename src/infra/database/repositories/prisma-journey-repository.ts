import { Journey } from "@/domain/journey/entities/journey";
import {
    IListJourneysRequest,
    IListJourneysResponse,
    JourneyRepository,
} from "@/domain/journey/repositories/journey-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaJourneyMapper } from "../mappers/prisma-journey-mapper";

class JourneyPrismaRepository implements JourneyRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }

    async findById(id: string): Promise<Journey | null> {
        const journey = await this.prismaClient.journey.findFirst({
            where: {
                id,
            },
        });
        if (!journey) {
            return null;
        }

        return PrismaJourneyMapper.toDomain(journey);
    }

    async create(journey: Journey): Promise<void> {
        const data = PrismaJourneyMapper.toPrisma(journey);

        await this.prismaClient.journey.create({
            data,
        });
    }
    async save(journey: Journey): Promise<void> {
        const data = PrismaJourneyMapper.toPrisma(journey);

        await this.prismaClient.journey.update({
            where: {
                id: journey.id.toString(),
            },
            data,
        });
    }

    async delete(journey: Journey): Promise<void> {
        await this.prismaClient.journey.delete({
            where: {
                id: journey.id.toString(),
            },
        });
    }
    async list({
        search,
        limit,
        offset,
    }: IListJourneysRequest): Promise<IListJourneysResponse | null> {
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

        const count = await this.prismaClient.journey.count({
            where,
        });

        const journeysP = await this.prismaClient.journey.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!journeysP) return null;

        const journeys = await Promise.all(
            journeysP.map(async (journeysP) => {
                return PrismaJourneyMapper.toDomain(journeysP);
            }),
        );

        return {
            journeys,
            count,
        };
    }
}

export { JourneyPrismaRepository };

