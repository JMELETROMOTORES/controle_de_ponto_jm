import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { NotFoundError } from "../errors/Not-found-error";
import { EmployeeRepository } from "../repositories/employee-repository";

type DeleteEmployeeUseCaseResponse = Either<NotFoundError, null>;
export class DeleteEmployeeUseCase
    implements IUseCase<string, DeleteEmployeeUseCaseResponse>
{
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string): Promise<DeleteEmployeeUseCaseResponse> {
        const employee = await this.employeeRepository.findById(id);

        if (!employee) {
            return left(new NotFoundError());
        }

        await this.employeeRepository.delete(employee);

        return right(null);
    }
}

