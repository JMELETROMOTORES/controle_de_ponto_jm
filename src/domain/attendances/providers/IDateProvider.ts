export interface ICalculateWorkTime {
    clockedIn: Date | undefined | null;
    lunchStart?: Date | null | undefined; 
    lunchEnd?: Date | null | undefined;
    clockedOut: Date;
}

export type WeekDay =
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";

interface IDateProvider {
    nextWeekDay(weekDay: WeekDay): WeekDay;
    isTimeOfDateBetween(
        compareDateTime: Date,
        firstDateTime: Date,
        secondDateTime: Date,
    ): boolean;
    currentDay(): Date;
    daysInMonth(): number;
    convertStrHourToDateTime(hourString: string): Date;
    compareInHours(start_date: Date | null | undefined, end_date: Date | null | undefined): number;
    currentDateWithTime(hour: number, minute: number, second: number): Date;
    convertToUtc(date: Date): string;
    compareInMinutes(start_date: Date | undefined, end_date: Date): number;
    calculateDelay(toleranceTime: Date | undefined | null, start_date: Date | undefined | null,): number;
    calculateExtraTime(
        end_time: Date,
        toleranceTimeEnd: Date,
        start_time: Date,
        toleranceTimeStart: Date,
    ): number;
    calculateDelayWithLunchTime(
        toleranceTime: number,
        lunchStart: Date | undefined | null,
        lunchEnd: Date,
    ): number;
    calculateExtraTimeClockedOut(
        end_time: Date,
        toleranceTimeEnd: Date,
    ): number;
    calculateExtraTimeClockedIn(
        start_time: Date | undefined | null,
        toleranceTimeStart: Date | undefined | null,
    ): number;
    isSameDay(date: Date | undefined | null , compareDate: Date): boolean;
    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean;
    isAM(dateTime: Date): boolean;
    isPM(dateTime: Date): boolean;
    calculateWorkTime(attendance: ICalculateWorkTime ): number;
    dateNow(): Date;
    addMinutes(date: Date, minutes: number): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(date: Date, days: number): Date;
    addHours(date: Date, hours: number): Date;
    compareInSeconds(start_date: Date | null | undefined, end_date: Date | null | undefined): number;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };

