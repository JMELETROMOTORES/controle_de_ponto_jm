import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { left } from "./../../../core/either";

type DeleteRegisterUseCaseResponde = Either<
    null,
    {
        attendance: Attendance;
    }
>;

export class DeleteRegisterUseCase
    implements IUseCase<string, DeleteRegisterUseCaseResponde>
{
    constructor(private readonly attendaceRepository: AttendanceRepository) {}

    async execute(id: string): Promise<DeleteRegisterUseCaseResponde> {
        const attendance = await this.attendaceRepository.findById(id);

        if (!attendance) {
            return left(null);
        }

        await this.attendaceRepository.delete(attendance);

        return right({ attendance });
    }
}

