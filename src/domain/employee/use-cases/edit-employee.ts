import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Employee } from "../entities/employee";
import { NotFoundError } from "../errors/Not-found-error";
import { RfidAlreadyUseError } from "../errors/Rfid-already-use";
import { MinimunLengthRfidError } from "../errors/minimum-length-rfid";
import { EmployeeRepository } from "../repositories/employee-repository";

export type IEditEmployeeDTO = {
    id: string;
    name: string;
    position: string;
    imgUrl: string;
    rfid: string;
    journeyId: UniqueEntityID;
};
type EditEmployeeUseCaseResponse = Either<
    NotFoundError | RfidAlreadyUseError | MinimunLengthRfidError,
    {
        employee: Employee;
    }
>;

export class EditEmployeeUseCase
    implements IUseCase<IEditEmployeeDTO, EditEmployeeUseCaseResponse>
{
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(
        data: IEditEmployeeDTO,
    ): Promise<EditEmployeeUseCaseResponse> {
        const employee = await this.employeeRepository.findById(data.id);

        if (!employee) {
            return left(new NotFoundError());
        }

        if (employee.rfid !== data.rfid) {
            const existingEmployee = await this.employeeRepository.findByRfid(
                data.rfid,
            );
            if (existingEmployee) {
                return left(new RfidAlreadyUseError());
            }
        }

        if (data.rfid.length < 10) {
            return left(new MinimunLengthRfidError());
        }

        employee.name = data.name;
        employee.position = data.position;
        employee.imgUrl = data.imgUrl;
        employee.rfid = data.rfid;
        employee.journeyId = data.journeyId;

        await this.employeeRepository.save(employee);

        return right({
            employee,
        });
    }
}

