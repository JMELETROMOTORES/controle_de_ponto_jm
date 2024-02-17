import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ICalculateWorkTime, IDateProvider, WeekDay } from "../IDateProvider";

dayjs.extend(utc);

export const toleranceTime = dayjs().hour(8).minute(5).toDate();
export const end = dayjs().hour(21).minute(10);

const mappedWeekDays = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    currentDateWithTime(hour: number, minute: number, second: number): Date {
        const currentDate = this.dateNow();
        currentDate.setHours(hour);
        currentDate.setMinutes(minute);
        currentDate.setSeconds(second);
        return currentDate;
    }

    calculateExtraTime(
        start_time: Date,
        end_time: Date,
        toleranceTimeEnd: Date,
        toleranceTimeStart: Date,
    ): number {
        const end_date_utc = this.convertToUtc(end_time);
        const start_date_utc = this.convertToUtc(start_time);

        return dayjs(end_date_utc).diff(start_date_utc, "minutes");
    }
    calculateWorkTime(attendance: ICalculateWorkTime): number {
        const start_date = attendance.clockedIn;
        const end_date = attendance.clockedOut;

        const lunchStart = attendance.lunchStart;
        const lunchEnd = attendance.lunchEnd;

        const start_date_utc = this.convertToUtc(start_date);
        const end_date_utc = this.convertToUtc(end_date);
        const lunchStart_utc = this.convertToUtc(lunchStart || new Date(0));
        const lunchEnd_utc = this.convertToUtc(lunchEnd || new Date(0));

        const totalWorkedHours = dayjs(end_date_utc).diff(
            start_date_utc,
            "minutes",
        );

        const lunchHours = dayjs(lunchEnd_utc).diff(lunchStart_utc, "hours");

        return totalWorkedHours - lunchHours;
    }

    calculateDelay(start_date: Date, toleranceTime: Date): number {
        const start_date_utc = this.convertToUtc(new Date(start_date));
        const toleranceTime_utc = this.convertToUtc(new Date(toleranceTime));

        return dayjs(start_date_utc).diff(toleranceTime_utc, "minutes");
    }

    isTimeOfDateBetween(
        compareDateTime: Date,
        firstDateTime: Date,
        secondDateTime: Date,
    ): boolean {
        const compareDate = dayjs(compareDateTime);
        const firstDate = dayjs(firstDateTime);
        const secondDate = dayjs(secondDateTime);

        return (
            compareDate.isAfter(firstDate) && compareDate.isBefore(secondDate)
        );
    }
    compareInMinutes(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "minutes");
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    addDays(date: Date, days: number): Date {
        return dayjs(date).add(days, "day").toDate();
    }

    addHours(date: Date, hours: number): Date {
        return dayjs(date).add(hours, "hour").toDate();
    }

    addMinutes(date: Date, minutes: number): Date {
        return dayjs(date).add(minutes, "minute").toDate();
    }

    isAM(dateTime: Date): boolean {
        return dayjs(dateTime).hour() < 12;
    }

    isPM(dateTime: Date): boolean {
        return dayjs(dateTime).hour() >= 12;
    }

    nextWeekDay(weekDay: WeekDay): WeekDay {
        const currentWeekDayNumber = <number>mappedWeekDays[weekDay];

        return <WeekDay>weekDays[currentWeekDayNumber + 1];
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean {
        const compareTimezone = compareDateTime.getTimezoneOffset();
        const compareDate = this.addMinutes(compareDateTime, compareTimezone);

        const timezone = dateTime.getTimezoneOffset();
        const date = this.addMinutes(compareDateTime, timezone);

        const compareTime = compareDate.getTime();
        const time = date.getTime();

        return compareTime < time;
    }

    convertStrHourToDateTime(
        hourString: string | null | undefined,
    ): Date | null {
        if (!hourString) {
            return null;
        }

        const [hour, minute] = hourString.split(":").map(Number);
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
    }
}

export { DayjsDateProvider };

