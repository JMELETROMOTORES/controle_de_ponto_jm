import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { Attendance } from "../entities/attendances";
import { LunchTime } from "../entities/value-objects/lunch-time";
import { NotFoundAttendanceError } from "../errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterLunchEndAttendanceDTO {
    id: string;
    rfid: string;
    lunchEnd: Date;
}

type RegistertLunchEndAttendanceUseCaseResponse = Either<
    NotFoundAttendanceError | NotFoundEmployeeError | EmployeeNotHaveAJourney,
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
    constructor(
        private entityFinderService: EntityFinderService,
        private calculateDelayService: DelayCalculationService,
        private readonly calculateWorkTimeService: WorkTimeCalculationService,
        private attendanceRepository: AttendanceRepository,
    ) {}

    async execute({
        id,
        rfid,
        lunchEnd,
    }: IRegisterLunchEndAttendanceDTO): Promise<RegistertLunchEndAttendanceUseCaseResponse> {
        const result = await this.entityFinderService.findEntities(id, rfid);
        if (result.isLeft()) {
            return left(result.value);
        }

        const { attendance, journey } = result.value;

        const delay = this.calculateDelayService.calculateTotalDelay(
            journey,
            attendance,
            lunchEnd,
        );

        if (attendance.lunchStart) {
            const lunchTime = new LunchTime(attendance.lunchStart, lunchEnd);
            attendance.lunchEnd = lunchTime.getEnd();
        }

        if (attendance.clockedOut) {
            const hoursWorked = this.calculateWorkTimeService.calculateWorkTime(
                attendance,
                attendance.clockedOut,
            );
            attendance.hoursWorked = hoursWorked;
        }

        attendance.delay = delay;

        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

