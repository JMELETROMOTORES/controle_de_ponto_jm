export interface ICalculateWorkTime {
    clockedIn: Date;
    lunchStart?: Date;
    lunchEnd?: Date;
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
    convertStrHourToDateTime(
        hourString: string | null | undefined,
    ): Date | null;
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
    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean;
    isAM(dateTime: Date): boolean;
    isPM(dateTime: Date): boolean;
    calculateWorkTime(attendance: ICalculateWorkTime): number;
    dateNow(): Date;
    addMinutes(date: Date, minutes: number): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(date: Date, days: number): Date;
    addHours(date: Date, hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };

