import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { Attendance } from "../entities/attendances";
import { NotFoundAttendanceError } from "../errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { IsSameDayError } from "../errors/is-same-day-error";

import { IDateProvider } from "../providers/IDateProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { LunchStartTimeError } from "../errors/lunch-start-time-error";

export interface IEditLunchEndAttendanceDTO {
    id: string;
    rfid: string;
    lunchEnd: Date;
}

type EditLunchEndAttendanceUseCaseResponse = Either<
    | NotFoundAttendanceError
    | NotFoundEmployeeError
    | IsSameDayError,
    {
        attendance: Attendance;
    }
>;
export class EditLunchEndAttendanceUseCase
    implements
        IUseCase<
            IEditLunchEndAttendanceDTO,
            EditLunchEndAttendanceUseCaseResponse
        >
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly calculateDelayService: DelayCalculationService,
        private readonly calculateWorkTimeService: WorkTimeCalculationService,
        private readonly dateProvider: IDateProvider,
        private entityFinderService: EntityFinderService,
    ) {}

    async execute({
        id,
        rfid,
        lunchEnd,
    }: IEditLunchEndAttendanceDTO): Promise<EditLunchEndAttendanceUseCaseResponse> {
        const result = await this.entityFinderService.findEntitiesId(id, rfid);
        if (result.isLeft()) {
            return left(result.value);
        }

        const { journey, attendance } = result.value;

        if(attendance.lunchStart) {
            const isTimeDateBefore = this.dateProvider.compareIfBefore(
                lunchEnd,
                attendance.lunchStart,
            );
    
            if (isTimeDateBefore) {
                return left(new LunchStartTimeError());
            }
    
    
            attendance.lunchEnd = lunchEnd;
    
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
    
        } else { 
            console.log('else')
        }
        
        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

