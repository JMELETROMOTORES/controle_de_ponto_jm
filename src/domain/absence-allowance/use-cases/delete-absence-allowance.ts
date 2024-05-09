import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { AbsenceAllowanceRepository } from "../repositories/absence-allowance-repository";

type DeleteAbsenceAllowanceUseCaseResponse = Either<null, null>;
export class DeleteAbsenceAllowanceUseCase
    implements IUseCase<string, DeleteAbsenceAllowanceUseCaseResponse>
{
    constructor(private readonly absenceAllowanceRepository: AbsenceAllowanceRepository) {}

    async execute(id: string): Promise<DeleteAbsenceAllowanceUseCaseResponse> {
        const absenceAllowance = await this.absenceAllowanceRepository.findById(id);

        if (!absenceAllowance) {
            return left(null);
        }

        await this.absenceAllowanceRepository.delete(absenceAllowance);

        return right(null);
    }
}

