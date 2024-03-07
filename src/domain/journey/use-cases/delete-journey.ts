import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { NotFoundError } from "../errors/Not-found-error";
import { JourneyRepository } from "../repositories/journey-repository";

type DeleteJourneyUseCaseResponse = Either<NotFoundError, null>;
export class DeleteJourneyUseCase
    implements IUseCase<string, DeleteJourneyUseCaseResponse>
{
    constructor(private readonly journeyRepository: JourneyRepository) {}

    async execute(id: string): Promise<DeleteJourneyUseCaseResponse> {
        const journey = await this.journeyRepository.findById(id);

        if (!journey) {
            return left(new NotFoundError());
        }

        await this.journeyRepository.delete(journey);

        return right(null);
    }
}

