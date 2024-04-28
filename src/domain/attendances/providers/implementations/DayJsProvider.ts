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

    currentDay(): Date {
        return dayjs().toDate();
    }

    daysInMonth(): number {
        const date = dayjs();
        const AllDays = date.daysInMonth();
        return AllDays;
    }
    currentDateWithTime(hour: number, minute: number, second: number): Date {
        const currentDate = this.dateNow();
        currentDate.setHours(hour);
        currentDate.setMinutes(minute);
        currentDate.setSeconds(second);
        return currentDate;
    }

    calculateExtraTimeClockedOut(
        end_time: Date,
        toleranceTimeEnd: Date,
    ): number {

        const extraTime = this.compareInSeconds(end_time, toleranceTimeEnd);
        if (extraTime < 0) {
            return 0;
        }
        return extraTime;
    }

    calculateExtraTimeClockedIn(
        start_time: Date,
        toleranceTimeStart: Date,
    ): number {
        console.log(start_time);
        const extraTime = this.compareInSeconds(toleranceTimeStart, start_time);
        if (extraTime < 0) {
            return 0;
        }
        return extraTime;
    }

    compareInSeconds(start_date: Date | null | undefined, end_date: Date | null | undefined): number {
        if (!start_date || !end_date) {
            return 0;
        }

        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "second");
    }
    calculateWorkTime(attendance: ICalculateWorkTime): number {
        const start_date = attendance.clockedIn;
        const end_date = attendance.clockedOut;

        const lunchStart = attendance.lunchStart;

        if (!lunchStart) {
            return 0;
        }
        const lunchEnd = attendance.lunchEnd;

        if (!lunchEnd) {
            return 0;
        }



        const totalWorkedHours = this.compareInSeconds(start_date, end_date);
        const lunchHours = this.compareInSeconds(lunchStart, lunchEnd);
        const total = totalWorkedHours - lunchHours;

        return total;
    }

    calculateExtraTime(
        end_time: Date,
        toleranceTimeEnd: Date,
        start_time: Date,
        toleranceTimeStart: Date,
    ): number {
        const extraTimeStart = this.calculateExtraTimeClockedIn(
            toleranceTimeStart,
            start_time,
        );

        if (extraTimeStart > 0) {
            return extraTimeStart;
        }

        const extraTimeEnd = this.calculateExtraTimeClockedOut(
            end_time,
            toleranceTimeEnd,
        );

        if (extraTimeEnd > 0) {
            return extraTimeEnd;
        }

        return extraTimeEnd + extraTimeStart;
    }

    calculateDelay(toleranceTime: Date, start_date: Date): number {
        const start = dayjs().hour(dayjs(start_date).hour()).minute(dayjs(start_date).minute()).second(dayjs(start_date).second());
        const end = dayjs().hour(dayjs(toleranceTime).hour()).minute(dayjs(toleranceTime).minute()).second(dayjs(toleranceTime).second());
    
        // Calcula a diferença em segundos
        let diffInSeconds = start.diff(end, 'second');
        console.log(diffInSeconds);
        // Se end for antes de start, assumimos que end é no dia seguinte
        if (diffInSeconds < 0) {
            return 0;
        }
    
        return diffInSeconds;
    }

    calculateDelayWithLunchTime(
        toleranceTime: number,
        lunchStart: Date,
        lunchEnd: Date,
    ): number {
        const lunchHours = this.compareInSeconds(lunchStart, lunchEnd);

        if (lunchHours >= toleranceTime * 60) {
            const diff = lunchHours - 3600;

            return diff;
        } else {
            return 0;
        }
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

    isSameDay(date: Date, compareDate: Date): boolean {
        return dayjs(date).isSame(compareDate, "day");
    }
    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean {
        const compareTimezone = compareDateTime.getTimezoneOffset();
        const compareDate = this.addMinutes(compareDateTime, compareTimezone);

        const timezone = dateTime.getTimezoneOffset();
        const date = this.addMinutes(compareDateTime, timezone);

        const compareTime = compareDate;
        const time = date;

        return compareTime < time;
    }

    convertStrHourToDateTime(hourString: string): Date {
        const [hour, minute] = hourString.split(":").map(Number);
        const date = new Date();
        date.setUTCHours(hour, minute, 0, 0);
        return date;
    }
}

export { DayjsDateProvider };

