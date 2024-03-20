import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { left } from "./../../../core/either";

type DeleteLunchStartAtUseCaseResponde = Either<
    null,
    {
        attendance: Attendance;
    }
>;

export class DeleteLunchStartAtUseCase
    implements IUseCase<string, DeleteLunchStartAtUseCaseResponde>
{
    constructor(private readonly attendaceRepository: AttendanceRepository) {}

    async execute(id: string): Promise<DeleteLunchStartAtUseCaseResponde> {
        const attendance = await this.attendaceRepository.findById(id);

        if (!attendance) {
            return left(null);
        }

        attendance.lunchStart = null;

        await this.attendaceRepository.save(attendance);

        return right({ attendance });
    }
}

