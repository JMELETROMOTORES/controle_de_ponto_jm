import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Attendance } from "../entities/attendances";
import { IDateProvider } from "../providers/IDateProvider";
import { toleranceTime } from "../providers/implementations/DayJsProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterClockedOutAttendanceDTO {
    rfid: string;
    clockedOut: Date;
}

type RegistertClockedOutAttendanceUseCaseResponse = Either<
    null,
    {
        attendance: Attendance;
    }
>;
export class RegisterClockedOutAttendanceUseCase
    implements
        IUseCase<
            IRegisterClockedOutAttendanceDTO,
            RegistertClockedOutAttendanceUseCaseResponse
        >
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly dayjsProvider: IDateProvider,
    ) {}

    async execute({
        rfid,
        clockedOut,
    }: IRegisterClockedOutAttendanceDTO): Promise<RegistertClockedOutAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findByRfid(rfid);
        if (!attendance) {
            return left(null);
        }

        const hoursWorked = this.dayjsProvider.calculateWorkTime({
            clockedIn: attendance.clockedIn,
            lunchStart: attendance.lunchStart,
            lunchEnd: attendance.lunchEnd,
            clockedOut,
        });

        const delay = this.dayjsProvider.calculateDelay(
            toleranceTime,
            attendance.clockedIn,
        );
        attendance.clockedOut = clockedOut;
        attendance.hoursWorked = hoursWorked;
        attendance.delay = delay;

        console.log(toleranceTime);

        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

