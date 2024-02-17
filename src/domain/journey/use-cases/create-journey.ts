import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Journey } from "../entities/journey";
import { JourneyRepository } from "../repositories/journey-repository";

export interface ICreateJourneyDTO {
    name: string;
    dayOfWeek: {
        day: string;
        start_date: string;
        end_date: string;
    }[];
}

type CreateJourneyUseCaseResponse = Either<
    null,
    {
        journey: Journey;
    }
>;
export class CreateJourneyUseCase
    implements IUseCase<ICreateJourneyDTO, CreateJourneyUseCaseResponse>
{
    constructor(private readonly journeyRepository: JourneyRepository) {}

    async execute({
        name,
        dayOfWeek,
    }: ICreateJourneyDTO): Promise<CreateJourneyUseCaseResponse> {
        const journey = Journey.create({
            name,
            dayOfWeek,
        });

        await this.journeyRepository.create(journey);

        return right({
            journey,
        });
    }
}

