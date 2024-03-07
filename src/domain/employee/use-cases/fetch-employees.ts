import { IListUseCaseParams } from "@/core/protocols/IListUseCase";

import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { Either, right } from "@/core/either";
import { ErrorHandler } from "@/core/errors/ErrorHandler";
import { IOffsetGenerator } from "@/core/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/core/pagination/adapters/ITotalPagesGenerator";
import { IPaginationResponse } from "@/core/pagination/interfaces/IPaginationResponse";
import { Employee } from "../entities/employee";
import { EmployeeRepository } from "../repositories/employee-repository";

type FetchEmployeeUseCaseResponse = Either<
    Error,
    IPaginationResponse<Employee>
>;
export class ListEmployeeUseCase {
    constructor(
        private readonly repository: EmployeeRepository,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<FetchEmployeeUseCaseResponse> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const employee = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!employee)
            throw new ErrorHandler(
                "Error on get employee from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: employee.count,
            limit,
        });

        return right({
            result: employee.employees,
            totalRegisters: employee.count,
            totalPages,
            currentPage: page ?? 0,
        });
    }
}

