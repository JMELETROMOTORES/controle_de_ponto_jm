import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Employee } from "../entities/employee";
import { RfidAlreadyUseError } from "../errors/Rfid-already-use";
import { MinimunLengthRfidError } from "../errors/minimum-length-rfid";
import { EmployeeRepository } from "../repositories/employee-repository";

export interface ICreateEmployeeDTO {
    name: string;
    position: string;
    imgUrl: string;
    rfid: string;
    journeyId: UniqueEntityID;
}

type CreateEmployeeUseCaseResponse = Either<
    RfidAlreadyUseError | MinimunLengthRfidError,
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
        rfid,
    }: ICreateEmployeeDTO): Promise<CreateEmployeeUseCaseResponse> {
        const employeeExist = await this.employeeRepository.findByRfid(rfid);

        if (employeeExist) return left(new RfidAlreadyUseError());

        if (rfid.length < 10) return left(new MinimunLengthRfidError());

        const employee = Employee.create({
            name,
            position,
            imgUrl,
            journeyId,
            rfid,
        });

        await this.employeeRepository.create(employee);

        return right({
            employee,
        });
    }
}

