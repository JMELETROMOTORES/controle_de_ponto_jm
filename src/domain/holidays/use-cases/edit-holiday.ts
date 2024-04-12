import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Holiday } from "../entities/holiday";
import { NotFoundError } from "../errors/Not-found-error";
import { HolidayRepository } from "../repositories/holiday-repository";

export type IEditHolidayDTO = {
    id: string;
    reason: string;
    date: Date;

};
type EditHolidayUseCaseResponse = Either<
    NotFoundError,
    {
        holiday: Holiday;
    }
>;

export class EditHolidayUseCase
    implements IUseCase<IEditHolidayDTO, EditHolidayUseCaseResponse>
{
    constructor(private readonly holidayRepository: HolidayRepository) {}

    async execute(data: IEditHolidayDTO): Promise<EditHolidayUseCaseResponse> {
        const holiday = await this.holidayRepository.findById(data.id);

        if (!holiday) {
            return left(new NotFoundError());
        }

        holiday.reason = data.reason;
        holiday.date = data.date;
        

        await this.holidayRepository.save(holiday);

        return right({
            holiday,
        });
    }
}

