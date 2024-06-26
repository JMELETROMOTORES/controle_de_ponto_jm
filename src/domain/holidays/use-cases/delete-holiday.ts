import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { NotFoundError } from "../errors/Not-found-error";
import { HolidayRepository } from "../repositories/holiday-repository";
import { Holiday } from "../entities/holiday";

type DeleteHolidayUseCaseResponse = Either<NotFoundError, {
    result: Holiday;
}>;
export class DeleteHolidayUseCase
    implements IUseCase<string, DeleteHolidayUseCaseResponse>
{
    constructor(private readonly holidayRepository: HolidayRepository) {}

    async execute(id: string): Promise<DeleteHolidayUseCaseResponse> {
        const holiday = await this.holidayRepository.findById(id);

        if (!holiday) {
            return left(new NotFoundError());
        }

        await this.holidayRepository.delete(holiday);

        return right({
            result: holiday,
        });
    }
}

