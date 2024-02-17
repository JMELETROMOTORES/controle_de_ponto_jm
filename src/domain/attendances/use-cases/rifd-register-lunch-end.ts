import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterLunchEndAttendanceDTO {
    rfid: string;
    lunchEnd: Date;
}

type RegistertLunchEndAttendanceUseCaseResponse = Either<
    null,
    {
        attendance: Attendance;
    }
>;
export class RegisterLunchEndAttendanceUseCase
    implements
        IUseCase<
            IRegisterLunchEndAttendanceDTO,
            RegistertLunchEndAttendanceUseCaseResponse
        >
{
    constructor(private readonly attendanceRepository: AttendanceRepository) {}

    async execute({
        rfid,
        lunchEnd,
    }: IRegisterLunchEndAttendanceDTO): Promise<RegistertLunchEndAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findByRfid(rfid);
        if (!attendance) {
            return left(null);
        }

        attendance.lunchEnd = lunchEnd;
        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

