import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUseCase } from "@/core/protocols/IUseCase";
import { AbsenceAllowance } from "../entities/absence-allowance";
import { EmployeeNotFoundError } from "../errors/employee-not-found-error";
import { AbsenceAllowanceRepository } from "../repositories/absence-allowance-repository";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";

export interface ICreateAbsenceAllowanceDTO {
    employeeId: string;
    reason: string;
    date: string;
}

type CreateAbsenceAllowanceUseCaseResponse = Either<
EmployeeNotFoundError,
    {
        absenceallowance: AbsenceAllowance;
    }
>;
export class CreateAbsenceAllowanceUseCase
    implements IUseCase<ICreateAbsenceAllowanceDTO, CreateAbsenceAllowanceUseCaseResponse>
{
    constructor(private readonly absenceallowanceRepository: AbsenceAllowanceRepository,
        private readonly employeeRepository: EmployeeRepository,
    ) {}

    async execute({
        employeeId,
        reason,
        date,
    }: ICreateAbsenceAllowanceDTO): Promise<CreateAbsenceAllowanceUseCaseResponse> {
        const employee = await this.employeeRepository.findById(employeeId);

        if (!employee) {
            return left(new EmployeeNotFoundError());
        }

        const absenceallowance = AbsenceAllowance.create(
            {
                employeeId,
                reason,
                date: new Date(date),
            },
            new UniqueEntityID(),
        );


        await this.absenceallowanceRepository.create(absenceallowance);

        return right({
            absenceallowance,
        });
    }
}

