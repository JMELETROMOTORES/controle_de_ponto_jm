// domain/services/DelayCalculationService.ts

import { Attendance } from "../attendances/entities/attendances";
import { IDateProvider } from "../attendances/providers/IDateProvider";
import { Journey } from "../journey/entities/journey";

export class ExtraTimeCalculationService {
    constructor(private readonly dateProvider: IDateProvider) {}

    calculateExtraTimeBefore(journey: Journey, attendance: Attendance): number {
        const start_date_extratime = this.dateProvider.convertStrHourToDateTime(
            journey.start_date_toleranceExtraTime,
        );

        console.log('start_date_extratime', start_date_extratime);
        const extraTimeBefore = this.dateProvider.calculateExtraTimeClockedIn(
            start_date_extratime,
            attendance.clockedIn,
        );

        console.log('extraTimeBefore', start_date_extratime);

        return extraTimeBefore;
    }

    calculateExtraTimeAfter(journey: Journey, clockedOut: Date): number {
        const currentDay = this.dateProvider.currentDay();

        if(currentDay.getDay() !== 6 ) {
            const end_date_extratime = this.dateProvider.convertStrHourToDateTime(
                journey.end_date_toleranceExtraTime,
            );
    
            const extraTimeAfter = this.dateProvider.calculateExtraTimeClockedOut(
                end_date_extratime,
                clockedOut,
            );
            
            return extraTimeAfter;
        } else {
            const end_date_extratime = this.dateProvider.convertStrHourToDateTime(
                journey.friday_end_date_toleranceExtraTime,
            );
    
            const extraTimeAfter = this.dateProvider.calculateExtraTimeClockedOut(
                end_date_extratime,
                clockedOut,
            );
            return extraTimeAfter;
        }
        
        
    }

    // calculate total extra time
    calculateTotalExtraTime(
        journey: Journey,
        attendance: Attendance,
        clockedOut: Date,
    ): number {
        const extraTimeBefore = this.calculateExtraTimeBefore(
            journey,
            attendance,
        );

        const extraTimeAfter = this.calculateExtraTimeAfter(
            journey,
            clockedOut,
        );
        const totalExtraTime = extraTimeBefore + extraTimeAfter;

        return totalExtraTime;
    }
}

