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


        const extraTimeBefore = this.dateProvider.calculateExtraTimeClockedIn(
            start_date_extratime,
            attendance.clockedIn,
        );


    
        return extraTimeBefore;
    }

    calculateExtraTimeAfter(journey: Journey, clockedOut: Date): number {
        const currentDay = this.dateProvider.currentDay(clockedOut);

        if(currentDay.getDay() !== 5 ) {
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


    calculateTotalExtraTime(
        journey: Journey,
        attendance: Attendance,
        clockedOut: Date,
    ): number {
        const extraTimeBefore = this.calculateExtraTimeBefore(
            journey,
            attendance,
        );

        console.log('teste1', extraTimeBefore);

        const extraTimeAfter = this.calculateExtraTimeAfter(
            journey,
            clockedOut,
        );
        console.log('teste1', journey);
        console.log('teste1', clockedOut);
        


        const totalExtraTime = extraTimeBefore + extraTimeAfter;

        return totalExtraTime;
    }
}

