import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { left } from "./../../../core/either";

type DeleteLunchEndAtUseCaseResponde = Either<
    null,
    {
        attendance: Attendance;
    }
>;

export class DeleteLunchEndAtUseCase
    implements IUseCase<string, DeleteLunchEndAtUseCaseResponde>
{
    constructor(private readonly attendaceRepository: AttendanceRepository) {}

    async execute(id: string): Promise<DeleteLunchEndAtUseCaseResponde> {
        const attendance = await this.attendaceRepository.findById(id);

        if (!attendance) {
            return left(null);
        }

        attendance.lunchEnd = null;

        await this.attendaceRepository.save(attendance);

        return right({ attendance });
    }
}

