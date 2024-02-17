import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ICalculateWorkTime, IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export const toleranceTime = dayjs().hour(8).minute(5).toDate();
export const end = dayjs().hour(21).minute(10);

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

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayjsDateProvider };

