import { Either, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterTimeInAttendanceDTO {
    rfid: string;
}

type RegistertTimeInAttendanceUseCaseResponse = Either<
    null,
    {
        attendance: Attendance;
    }
>;
export class RegisterTimeInAttendanceUseCase
    implements
        IUseCase<
            IRegisterTimeInAttendanceDTO,
            RegistertTimeInAttendanceUseCaseResponse
        >
{
    constructor(private readonly attendanceRepository: AttendanceRepository) {}

    async execute({
        rfid,
    }: IRegisterTimeInAttendanceDTO): Promise<RegistertTimeInAttendanceUseCaseResponse> {
        const attendance = Attendance.create({
            rfid,
        });

        await this.attendanceRepository.create(attendance);
        return right({ attendance });
    }
}

