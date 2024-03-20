// domain/services/DelayCalculationService.ts

import { Attendance } from "../attendances/entities/attendances";
import { IDateProvider } from "../attendances/providers/IDateProvider";

export class WorkTimeCalculationService {
    constructor(private readonly dateProvider: IDateProvider) {}

    calculateWorkTime(attendance: Attendance, clockedOut: Date): number {
        const hoursWorked = this.dateProvider.calculateWorkTime({
            clockedIn: attendance.clockedIn,
            lunchStart: attendance.lunchStart,
            lunchEnd: attendance.lunchEnd,
            clockedOut,
        });
        return hoursWorked;
    }
}

