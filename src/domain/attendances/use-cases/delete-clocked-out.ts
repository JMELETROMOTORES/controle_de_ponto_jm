import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { left } from "./../../../core/either";

type DeleteClockedOutUseCaseResponde = Either<
    null,
    {
        attendance: Attendance;
    }
>;

export class DeleteClockedOutUseCase
    implements IUseCase<string, DeleteClockedOutUseCaseResponde>
{
    constructor(private readonly attendaceRepository: AttendanceRepository) {}

    async execute(id: string): Promise<DeleteClockedOutUseCaseResponde> {
        const attendance = await this.attendaceRepository.findById(id);

        if (!attendance) {
            return left(null);
        }

        attendance.clockedOut = null;

        await this.attendaceRepository.save(attendance);

        return right({ attendance });
    }
}

