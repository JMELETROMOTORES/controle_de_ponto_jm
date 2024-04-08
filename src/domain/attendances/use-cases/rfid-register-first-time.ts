import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { Attendance } from "../entities/attendances";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { IsSameDayError } from "../errors/is-same-day-error";
import { IDateProvider } from "../providers/IDateProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterFirstTimeInAttendanceDTO {
    rfid: string;
    clockedIn?: Date;
}

type RegistertTimeInAttendanceUseCaseResponse = Either<
    EmployeeNotHaveAJourney | NotFoundEmployeeError | IsSameDayError,
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
        private readonly calculateDelayService: DelayCalculationService,
        private readonly calculaExtraTimeService: ExtraTimeCalculationService,
        private readonly dateProvider: IDateProvider,
        private readonly calculateWorkTimeService: WorkTimeCalculationService,
        private entityFinderService: EntityFinderService,
    ) {}

    async execute({
        rfid,
        clockedIn,
    }: IRegisterFirstTimeInAttendanceDTO): Promise<RegistertTimeInAttendanceUseCaseResponse> {
        const result =
            await this.entityFinderService.findEntitiesNoAttendance(rfid);
        if (result.isLeft()) {
            return left(result.value);
        }

        const { employee, journey } = result.value;

        const attendance = Attendance.create({
            rfid,
            clockedIn,
            employeeId: employee.id.toString(),
        });

        if(clockedIn) {
            const isSameDay = this.dateProvider.isSameDay(
                attendance.clockedIn,
                attendance.date,
            );

            if (!isSameDay) {
                return left(new IsSameDayError());
            }
            const extraTimeBefore =
                this.calculaExtraTimeService.calculateExtraTimeBefore(
                    journey,
                    attendance,
                );
            attendance.extraHours = extraTimeBefore;
            const delay = this.calculateDelayService.calculateDelayFirtsTime(
                journey,
                attendance,
            );
            attendance.delay = delay;
            if (attendance.clockedOut) {
                const hoursWorked = this.calculateWorkTimeService.calculateWorkTime(
                    attendance,
                    attendance.clockedOut,
                );
                attendance.hoursWorked = hoursWorked;
            }
        }
    




        await this.attendanceRepository.create(attendance);
        return right({ attendance });
    }
}

