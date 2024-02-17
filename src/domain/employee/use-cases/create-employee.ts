import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Employee } from "../entities/employee";
import { EmployeeRepository } from "../repositories/employees-repository";

export interface ICreateEmployeeDTO {
    name: string;
    position: string;
    imgUrl: string;
    access_code: string;
    journeyId: UniqueEntityID;
}

type CreateEmployeeUseCaseResponse = Either<
    null,
    {
        employee: Employee;
    }
>;
export class CreateEmployeeUseCase
    implements IUseCase<ICreateEmployeeDTO, CreateEmployeeUseCaseResponse>
{
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute({
        name,
        position,
        imgUrl,
        journeyId,
        access_code,
    }: ICreateEmployeeDTO): Promise<CreateEmployeeUseCaseResponse> {
        const employee = Employee.create({
            name,
            position,
            imgUrl,
            journeyId,
            access_code,
        });

        await this.employeeRepository.create(employee);

        return right({
            employee,
        });
    }
}

