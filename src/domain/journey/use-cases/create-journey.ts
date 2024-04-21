import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Journey } from "../entities/journey";
import { JourneyRepository } from "../repositories/journey-repository";

export interface ICreateJourneyDTO {
    name: string;
    start_date: string;
    end_date: string;
    lunch_time_tolerance: number;
    start_date_toleranceDelay: string;
    start_date_toleranceExtraTime: string;
    end_date_toleranceExtraTime: string;
    friday_end_date: string;
    friday_end_date_toleranceExtraTime: string;
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
        start_date,
        end_date,
        lunch_time_tolerance,
        start_date_toleranceExtraTime,
        end_date_toleranceExtraTime,
        start_date_toleranceDelay,
        friday_end_date,   
        friday_end_date_toleranceExtraTime
    }: ICreateJourneyDTO): Promise<CreateJourneyUseCaseResponse> {
        const journey = Journey.create({
            name,
            start_date,
            end_date,
            lunch_time_tolerance,
            start_date_toleranceDelay,
            start_date_toleranceExtraTime,
            end_date_toleranceExtraTime,
            friday_end_date,
            friday_end_date_toleranceExtraTime
        });

        await this.journeyRepository.create(journey);

        return right({
            journey,
        });
    }
}

