import { IListUseCaseParams } from "@/core/protocols/IListUseCase";

import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { Either, right } from "@/core/either";
import { ErrorHandler } from "@/core/errors/ErrorHandler";
import { IOffsetGenerator } from "@/core/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/core/pagination/adapters/ITotalPagesGenerator";
import { IPaginationResponse } from "@/core/pagination/interfaces/IPaginationResponse";
import { Journey } from "../entities/journey";
import { JourneyRepository } from "../repositories/journey-repository";

type FetchJourneyUseCaseResponse = Either<Error, IPaginationResponse<Journey>>;
export class ListJourneyUseCase {
    constructor(
        private readonly repository: JourneyRepository,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<FetchJourneyUseCaseResponse> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const journey = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!journey)
            throw new ErrorHandler(
                "Error on get journey from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: journey.count,
            limit,
        });

        return right({
            result: journey.journeys,
            totalRegisters: journey.count,
            totalPages,
            currentPage: page ?? 0,
        });
    }
}

