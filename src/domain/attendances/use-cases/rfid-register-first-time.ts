import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { JourneyRepository } from "@/domain/journey/repositories/journey-repository";
import { Attendance } from "../entities/attendances";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { IDateProvider } from "../providers/IDateProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterFirstTimeInAttendanceDTO {
    rfid: string;
    clockedIn?: Date;
}

type RegistertTimeInAttendanceUseCaseResponse = Either<
    EmployeeNotHaveAJourney | NotFoundEmployeeError,
    {
        attendance: Attendance;
    }
>;
export class RegisterFirstTimeInAttendanceUseCase
    implements
        IUseCase<
            IRegisterFirstTimeInAttendanceDTO,
            RegistertTimeInAttendanceUseCaseResponse
        >
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly dayjsProvider: IDateProvider,
        private readonly employeeRepository: EmployeeRepository,
        private readonly journeyRepository: JourneyRepository,
    ) {}

    async execute({
        rfid,
        clockedIn,
    }: IRegisterFirstTimeInAttendanceDTO): Promise<RegistertTimeInAttendanceUseCaseResponse> {
        const employee = await this.employeeRepository.findByRfid(rfid);

        if (!employee) {
            return left(new NotFoundEmployeeError());
        }
        const attendance = Attendance.create({
            rfid,
            clockedIn,
            employeeId: employee.id.toString(),
        });

        const journey = await this.journeyRepository.findById(
            employee.journeyId.toString(),
        );

        if (!journey) {
            return left(new EmployeeNotHaveAJourney());
        }

        const journeyToleranceTime =
            this.dayjsProvider.convertStrHourToDateTime(
                journey.start_date_toleranceDelay,
            );

        const start_date_extratime =
            this.dayjsProvider.convertStrHourToDateTime(
                journey.start_date_toleranceExtraTime,
            );

        const extraTimeBefore = this.dayjsProvider.calculateExtraTimeClockedIn(
            start_date_extratime,
            attendance.clockedIn,
        );

        const delay = this.dayjsProvider.calculateDelay(
            journeyToleranceTime,
            attendance.clockedIn,
        );

        attendance.delay = delay;
        attendance.extraHours = extraTimeBefore;
        await this.attendanceRepository.create(attendance);
        return right({ attendance });
    }
}

