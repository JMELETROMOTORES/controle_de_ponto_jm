// domain/services/DelayCalculationService.ts

import { Attendance } from "../attendances/entities/attendances";
import { IDateProvider } from "../attendances/providers/IDateProvider";
import { Journey } from "../journey/entities/journey";

export class DelayCalculationService {
    constructor(private readonly dateProvider: IDateProvider) {}

    calculateTotalDelay(
        journey: Journey,
        attendance: Attendance,
        lunchEnd: Date,
    ): number {
        
        const journeyToleranceTime = this.dateProvider.convertStrHourToDateTime(
            journey.start_date_toleranceDelay,
        );

        console.log('journeyToleranceTime', journeyToleranceTime);
    
        const delay = this.dateProvider.calculateDelay(
            journeyToleranceTime,
            attendance.clockedIn,
        );

        console.log('delay', delay);
        const delayWithLunchTime =
            this.dateProvider.calculateDelayWithLunchTime(
                journey.lunch_time_tolerance,
                attendance.lunchStart,
                lunchEnd,
            );
            console.log('delayWithLunchTime', attendance.lunchStart);
            console.log('delayWithLunchTime', lunchEnd);
        return delay + delayWithLunchTime;
    }

    calculateDelayFirtsTime(journey: Journey, attendance: Attendance): number {
        const journeyToleranceTime = this.dateProvider.convertStrHourToDateTime(
            journey.start_date_toleranceDelay,
        );
        const delay = this.dateProvider.calculateDelay(
            journeyToleranceTime,
            attendance.clockedIn,
        );

        return delay;
    }
}

