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

export interface IEditAttendanceDTO {
    id: string;
    employeeId: string;
    clockedIn: Date;
    lunchStart: Date;
    lunchEnd: Date;
    clockedOut: Date;
}

type EditAttendanceUseCaseResponse = Either<
    NotFoundAttendanceError | NotFoundEmployeeError | EmployeeNotHaveAJourney,
    {
        attendance: Attendance;
    }
>;
export class EditAttendanceUseCase
    implements IUseCase<IEditAttendanceDTO, EditAttendanceUseCaseResponse>
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly dayjsProvider: IDateProvider,
        private readonly employeeRepository: EmployeeRepository,
        private readonly journeyRepository: JourneyRepository,
    ) {}

    async execute({
        id,
        employeeId,
        clockedIn,
        lunchStart,
        lunchEnd,
        clockedOut,
    }: IEditAttendanceDTO): Promise<EditAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findById(id);

        if (!attendance) {
            return left(new NotFoundAttendanceError());
        }

        const employee = await this.employeeRepository.findById(employeeId);

        if (!employee) {
            return left(new NotFoundEmployeeError());
        }

        const journey = await this.journeyRepository.findById(
            employee.journeyId.toString(),
        );

        if (!journey) {
            return left(new EmployeeNotHaveAJourney());
        }

        const journeyToleranceTime =
            this.dayjsProvider.convertStrHourToDateTime(journey.start_date);

        const start_date_extratime =
            this.dayjsProvider.convertStrHourToDateTime(
                journey.start_date_toleranceExtraTime,
            );

        const end_date_extratime = this.dayjsProvider.convertStrHourToDateTime(
            journey.end_date_toleranceExtraTime,
        );

        const extraTime = this.dayjsProvider.calculateExtraTime(
            clockedOut,
            end_date_extratime,
            clockedIn,
            start_date_extratime,
        );

        const delay = this.dayjsProvider.calculateDelay(
            journeyToleranceTime,
            attendance.clockedIn,
        );

        console.log(delay);

        const hoursWorked = this.dayjsProvider.calculateWorkTime({
            clockedIn: attendance.clockedIn,
            lunchStart: attendance.lunchStart,
            lunchEnd: attendance.lunchEnd,
            clockedOut,
        });

        attendance.clockedIn = clockedIn;
        attendance.lunchStart = lunchStart;
        attendance.lunchEnd = lunchEnd;
        attendance.clockedOut = clockedOut;
        attendance.delay = delay;
        attendance.extraHours = extraTime;
        attendance.hoursWorked = hoursWorked;

        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

