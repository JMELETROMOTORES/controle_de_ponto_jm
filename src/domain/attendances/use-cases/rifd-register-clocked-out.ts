import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { JourneyRepository } from "@/domain/journey/repositories/journey-repository";
import { Attendance } from "../entities/attendances";
import { NotFoundAttendanceError } from "../errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { IDateProvider } from "../providers/IDateProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterClockedOutAttendanceDTO {
    id: string;
    rfid: string;
    clockedOut: Date;
}

type RegistertClockedOutAttendanceUseCaseResponse = Either<
    NotFoundAttendanceError | NotFoundEmployeeError | EmployeeNotHaveAJourney,
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
        private readonly journeyRepository: JourneyRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly dayjsProvider: IDateProvider,
    ) {}

    async execute({
        id,
        rfid,
        clockedOut,
    }: IRegisterClockedOutAttendanceDTO): Promise<RegistertClockedOutAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findById(id);

        if (!attendance) {
            return left(new NotFoundAttendanceError());
        }

        const employee = await this.employeeRepository.findByRfid(rfid);

        if (!employee) {
            return left(new NotFoundEmployeeError());
        }

        const journey = await this.journeyRepository.findById(
            employee.journeyId.toString(),
        );

        if (!journey) {
            return left(new EmployeeNotHaveAJourney());
        }

        const end_date_extratime = this.dayjsProvider.convertStrHourToDateTime(
            journey.end_date_toleranceExtraTime,
        );
        const hoursWorked = this.dayjsProvider.calculateWorkTime({
            clockedIn: attendance.clockedIn,
            lunchStart: attendance.lunchStart,
            lunchEnd: attendance.lunchEnd,
            clockedOut,
        });

        const extraTimeAfter = this.dayjsProvider.calculateExtraTimeClockedOut(
            end_date_extratime,
            clockedOut,
        );

        attendance.clockedOut = clockedOut;
        attendance.hoursWorked = hoursWorked;
        attendance.extraHours += extraTimeAfter;

        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

