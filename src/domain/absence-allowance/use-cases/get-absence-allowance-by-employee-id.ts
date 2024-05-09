import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { AbsenceAllowance } from "../entities/absence-allowance";

import { AbsenceAllowanceRepository } from "../repositories/absence-allowance-repository";
import { EmployeeNotFoundError } from "../errors/employee-not-found-error";

interface getAbsenceAllowanceUseCaseRequest {
    EmployeeId: string;
}

type getAbsenceAllowanceUseCaseResponse = Either<
    EmployeeNotFoundError,
    {
        absenceallowance: AbsenceAllowance[];
    }
>;

export class GetAbsenceAllowanceUseCase
    implements IUseCase<getAbsenceAllowanceUseCaseRequest, getAbsenceAllowanceUseCaseResponse>
{
    constructor(private absenceallowanceRepository: AbsenceAllowanceRepository) {}

    async execute({
        EmployeeId,
    }: getAbsenceAllowanceUseCaseRequest): Promise<getAbsenceAllowanceUseCaseResponse> {
        const absenceallowance = await this.absenceallowanceRepository.findByEmployeeId(EmployeeId);

        if (!absenceallowance) {
            return left(new EmployeeNotFoundError());
        }

        
        return right({
            absenceallowance,
        });
    }
}

