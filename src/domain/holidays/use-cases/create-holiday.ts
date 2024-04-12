import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Holiday } from "../entities/holiday";
import { HolidayRepository } from "../repositories/holiday-repository";

export interface ICreateHolidayDTO {
    reason: string;
    date: Date;
}

type CreateHolidayUseCaseResponse = Either<
    null,
    {
        holiday: Holiday;
    }
>;
export class CreateHolidayUseCase
    implements IUseCase<ICreateHolidayDTO, CreateHolidayUseCaseResponse>
{
    constructor(private readonly holidayRepository: HolidayRepository) {}

    async execute({
        reason,
        date,
    }: ICreateHolidayDTO): Promise<CreateHolidayUseCaseResponse> {
        const holiday = Holiday.create({
            reason,
            date
        });

        await this.holidayRepository.create(holiday);

        return right({
            holiday,
        });
    }
}

