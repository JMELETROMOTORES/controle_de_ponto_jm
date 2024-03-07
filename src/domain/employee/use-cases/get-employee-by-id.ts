import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Employee } from "../entities/employee";
import { NotFoundError } from "../errors/Not-found-error";
import { EmployeeRepository } from "../repositories/employee-repository";

interface getEmployeeUseCaseRequest {
    id: string;
}

type getEmployeeUseCaseResponse = Either<
    NotFoundError,
    {
        employee: Employee;
    }
>;

export class GetEmployeeUseCase
    implements IUseCase<getEmployeeUseCaseRequest, getEmployeeUseCaseResponse>
{
    constructor(private employeeRepository: EmployeeRepository) {}

    async execute({
        id,
    }: getEmployeeUseCaseRequest): Promise<getEmployeeUseCaseResponse> {
        const employee = await this.employeeRepository.findById(id);

        if (!employee) {
            return left(new NotFoundError());
        }

        return right({
            employee,
        });
    }
}

