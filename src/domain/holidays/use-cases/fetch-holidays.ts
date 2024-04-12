import { IListUseCaseParams } from "@/core/protocols/IListUseCase";

import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { Either, right } from "@/core/either";
import { ErrorHandler } from "@/core/errors/ErrorHandler";
import { IOffsetGenerator } from "@/core/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/core/pagination/adapters/ITotalPagesGenerator";
import { IPaginationResponse } from "@/core/pagination/interfaces/IPaginationResponse";
import { Holiday } from "../entities/holiday";
import { HolidayRepository } from "../repositories/holiday-repository";

type FetchHolidayUseCaseResponse = Either<Error, IPaginationResponse<Holiday>>;
export class ListHolidayUseCase {
    constructor(
        private readonly repository: HolidayRepository,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<FetchHolidayUseCaseResponse> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const holiday = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!holiday)
            throw new ErrorHandler(
                "Error on get holiday from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: holiday.count,
            limit,
        });

        return right({
            result: holiday.holidays,
            totalRegisters: holiday.count,
            totalPages,
            currentPage: page ?? 0,
        });
    }
}

