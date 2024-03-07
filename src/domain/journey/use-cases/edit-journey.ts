import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Journey } from "../entities/journey";
import { NotFoundError } from "../errors/Not-found-error";
import { JourneyRepository } from "../repositories/journey-repository";

export type IEditJourneyDTO = {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    lunch_time_tolerance: number;
};
type EditJourneyUseCaseResponse = Either<
    NotFoundError,
    {
        journey: Journey;
    }
>;

export class EditJourneyUseCase
    implements IUseCase<IEditJourneyDTO, EditJourneyUseCaseResponse>
{
    constructor(private readonly journeyRepository: JourneyRepository) {}

    async execute(data: IEditJourneyDTO): Promise<EditJourneyUseCaseResponse> {
        const journey = await this.journeyRepository.findById(data.id);

        if (!journey) {
            return left(new NotFoundError());
        }

        journey.name = data.name;
        journey.start_date = data.start_date;
        journey.end_date = data.end_date;
        journey.lunch_time_tolerance = data.lunch_time_tolerance;

        await this.journeyRepository.save(journey);

        return right({
            journey,
        });
    }
}

