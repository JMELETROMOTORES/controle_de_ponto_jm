import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";

import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { left } from "./../../../core/either";

type DeleteAttendanceUseCaseResponde = Either<
    null,
    {
        attendance: Attendance;
    }
>;

export class DeleteAttendanceUseCase
    implements IUseCase<string, DeleteAttendanceUseCaseResponde>
{
    constructor(private readonly attendaceRepository: AttendanceRepository) {}

    async execute(id: string): Promise<DeleteAttendanceUseCaseResponde> {
        const attendance = await this.attendaceRepository.findById(id);

        if (!attendance) {
            return left(null);
        }

        await this.attendaceRepository.delete(attendance);

        return right({ attendance });
    }
}

