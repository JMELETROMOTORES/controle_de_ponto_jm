export interface ICalculateWorkTime {
    clockedIn: Date;
    lunchStart?: Date;
    lunchEnd?: Date;
    clockedOut: Date;
}
interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    currentDateWithTime(hour: number, minute: number, second: number): Date;
    convertToUtc(date: Date): string;
    compareInMinutes(start_date: Date, end_date: Date): number;
    calculateDelay(toleranceTime: Date, start_date: Date): number;
    calculateExtraTime(
        start_time: Date,
        end_time: Date,
        toleranceTimeStart: Date,
        toleranceTimeEnd: Date,
    ): number;
    calculateWorkTime(attendance: ICalculateWorkTime): number;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };

