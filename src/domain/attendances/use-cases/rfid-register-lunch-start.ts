import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { Attendance } from "../entities/attendances";
import { NotFoundAttendanceError } from "../errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { IsSameDayError } from "../errors/is-same-day-error";
import { LunchStartTimeError } from "../errors/lunch-start-time-error";
import { IDateProvider } from "../providers/IDateProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { ScheduleAlreadyExist } from "../errors/schedule-already-exist";

export interface IRegisterLunchStartAttendanceDTO {
    rfid: string;
    lunchStart: Date;
}

type RegistertLunchStartAttendanceUseCaseResponse = Either<
    | NotFoundAttendanceError
    | NotFoundEmployeeError
    | LunchStartTimeError
    | IsSameDayError
    | ScheduleAlreadyExist,
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
        private readonly calculateDelayService: DelayCalculationService,
        private readonly calculateWorkTimeService: WorkTimeCalculationService,
        private readonly dateProvider: IDateProvider,
        private entityFinderService: EntityFinderService,
    ) {}

    async execute({
        rfid,
        lunchStart,
    }: IRegisterLunchStartAttendanceDTO): Promise<RegistertLunchStartAttendanceUseCaseResponse> {
        const result = await this.entityFinderService.findEntities(new Date(), rfid);
        if (result.isLeft()) {
            return left(result.value);
        }

        const { journey, attendance } = result.value;
        
        if(attendance.lunchStart) {
            return left(new ScheduleAlreadyExist());
        }
    
        if(attendance.clockedIn) {
            const isTimeDateBefore = this.dateProvider.compareIfBefore(
                lunchStart,
                attendance.clockedIn,
            );
    
            if (isTimeDateBefore) {
                return left(new LunchStartTimeError());
            }
    
            const isSameDay = this.dateProvider.isSameDay(
                lunchStart,
                attendance.date,
            );
    
            if (!isSameDay) {
                return left(new IsSameDayError());
            }
            attendance.lunchStart = lunchStart;

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

