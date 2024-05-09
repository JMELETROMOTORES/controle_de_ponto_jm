import { IListUseCaseParams } from "@/core/protocols/IListUseCase";

import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { Either, right } from "@/core/either";
import { ErrorHandler } from "@/core/errors/ErrorHandler";
import { IOffsetGenerator } from "@/core/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/core/pagination/adapters/ITotalPagesGenerator";
import { IPaginationResponse } from "@/core/pagination/interfaces/IPaginationResponse";


import { AttendanceRepository } from "../repositories/attendance-repository";
import { AttendancesEmployees } from "../entities/value-objects/attendances-with-employees";

type FetchAttendanceUseCaseResponse = Either<
    Error,
    IPaginationResponse<AttendancesEmployees>
>;
export class ListAttendanceUseCase {
    constructor(
        private readonly repository: AttendanceRepository,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<FetchAttendanceUseCaseResponse> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const attendance = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!attendance)
            throw new ErrorHandler(
                "Error on get attendance from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: attendance.count,
            limit,
        });

        return right({
            result: attendance.attendances,
            totalRegisters: attendance.count,
            totalPages,
            currentPage: page ?? 0,
        });
    }
}

