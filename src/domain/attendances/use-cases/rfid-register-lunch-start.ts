import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterLunchStartAttendanceDTO {
    rfid: string;
    lunchStart: Date;
}

type RegistertLunchStartAttendanceUseCaseResponse = Either<
    null,
    {
        attendance: Attendance;
    }
>;
export class RegisterLunchStartAttendanceUseCase
    implements
        IUseCase<
            IRegisterLunchStartAttendanceDTO,
            RegistertLunchStartAttendanceUseCaseResponse
        >
{
    constructor(private readonly attendanceRepository: AttendanceRepository) {}

    async execute({
        rfid,
        lunchStart,
    }: IRegisterLunchStartAttendanceDTO): Promise<RegistertLunchStartAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findByRfid(rfid);
        if (!attendance) {
            return left(null);
        }

        attendance.lunchStart = lunchStart;
        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

