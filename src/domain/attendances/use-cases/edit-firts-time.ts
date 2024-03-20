import { Either, left, right } from "@/core/either";

import { IUseCase } from "@/core/protocols/IUseCase";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { Attendance } from "../entities/attendances";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IEditFirstTimeUseCaseDTO {
    attendanceId: string;
    rfid: string;
    newTime: Date;
}

type EditFirstTimeUseCaseResponse = Either<
    EmployeeNotHaveAJourney | NotFoundEmployeeError,
    {
        attendance: Attendance;
    }
>;

export class EditFirstTimeUseCase
    implements IUseCase<IEditFirstTimeUseCaseDTO, EditFirstTimeUseCaseResponse>
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private entityFinderService: EntityFinderService,
        private readonly calculateDelayService: DelayCalculationService,
        private readonly calculaExtraTimeService: ExtraTimeCalculationService,
        private readonly calculateWorkTimeService: WorkTimeCalculationService,
    ) {}

    async execute({
        attendanceId,
        rfid,
        newTime,
    }: IEditFirstTimeUseCaseDTO): Promise<EditFirstTimeUseCaseResponse> {
        const result = await this.entityFinderService.findEntities(
            attendanceId,
            rfid,
        );
        if (result.isLeft()) {
            return left(result.value);
        }

        const { journey, attendance } = result.value;

        attendance.clockedIn = newTime;

        if (attendance.clockedOut) {
            const extra = this.calculaExtraTimeService.calculateTotalExtraTime(
                journey,
                attendance,
                attendance.clockedOut,
            );

            attendance.extraHours = extra;
        }

        if (attendance.lunchEnd) {
            const delay = this.calculateDelayService.calculateTotalDelay(
                journey,
                attendance,
                attendance.lunchEnd,
            );
            attendance.delay = delay;
        }

        if (attendance.clockedOut) {
            const hoursWorked = this.calculateWorkTimeService.calculateWorkTime(
                attendance,
                attendance.clockedOut,
            );
            attendance.hoursWorked = hoursWorked;
        }

        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

