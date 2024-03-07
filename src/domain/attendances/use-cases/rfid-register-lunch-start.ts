import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { Attendance } from "../entities/attendances";
import { NotFoundAttendanceError } from "../errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterLunchStartAttendanceDTO {
    id: string;
    rfid: string;
    lunchStart: Date;
}

type RegistertLunchStartAttendanceUseCaseResponse = Either<
    NotFoundAttendanceError | NotFoundEmployeeError,
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
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly employeeRepository: EmployeeRepository,
    ) {}

    async execute({
        id,
        rfid,
        lunchStart,
    }: IRegisterLunchStartAttendanceDTO): Promise<RegistertLunchStartAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findById(id);

        if (!attendance) {
            return left(new NotFoundAttendanceError());
        }

        const employee = await this.employeeRepository.findByRfid(rfid);
        if (!employee) {
            return left(new NotFoundEmployeeError());
        }

        attendance.lunchStart = lunchStart;
        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

