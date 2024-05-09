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
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";

export interface IEditClockedOutAttendanceDTO {
    id: string;
    rfid: string;
    clockedOut: Date;
}

type EditClockedOutAttendanceUseCaseResponse = Either<
    | NotFoundAttendanceError
    | NotFoundEmployeeError
    | IsSameDayError,
    {
        attendance: Attendance;
    }
>;
export class EditClockedOutAttendanceUseCase
    implements
        IUseCase<
            IEditClockedOutAttendanceDTO,
            EditClockedOutAttendanceUseCaseResponse
        >
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly calculateDelayService: DelayCalculationService,
        private readonly calculateWorkTimeService: WorkTimeCalculationService,
        private readonly calculaExtraTimeService: ExtraTimeCalculationService,
        private readonly dateProvider: IDateProvider,
        private entityFinderService: EntityFinderService,
    ) {}

    async execute({
        id,
        rfid,
        clockedOut,
    }: IEditClockedOutAttendanceDTO): Promise<EditClockedOutAttendanceUseCaseResponse> {
        const result = await this.entityFinderService.findEntitiesId(id, rfid);
        if (result.isLeft()) {
            return left(result.value);
        }

        const { journey, attendance } = result.value;
    
        if(attendance.lunchEnd) {
            const isTimeDateBefore = this.dateProvider.compareIfBefore(
                clockedOut,
                attendance.lunchEnd,
            );
    
            if (isTimeDateBefore) {
                return left(new LunchStartTimeError());
            }
    
    
            attendance.clockedOut = clockedOut;

            if (attendance.clockedOut) {
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
            
            if (attendance.clockedOut) {
                const extra = this.calculaExtraTimeService.calculateTotalExtraTime(
                    journey,
                    attendance,
                    attendance.clockedOut,
                );
    
                attendance.extraHours = extra;
            }
        } else { 
            console.log('else')
        }
        
        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

