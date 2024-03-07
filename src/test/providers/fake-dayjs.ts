import {
    ICalculateWorkTime,
    IDateProvider,
    WeekDay,
} from "@/domain/attendances/providers/IDateProvider";

class FakeDateProvider implements IDateProvider {
    nextWeekDay(weekDay: WeekDay): WeekDay {
        throw new Error("Method not implemented.");
    }
    isTimeOfDateBetween(
        compareDateTime: Date,
        firstDateTime: Date,
        secondDateTime: Date,
    ): boolean {
        throw new Error("Method not implemented.");
    }
    isTimeOfDateBefore(compareDateTime: Date, dateTime: Date): boolean {
        throw new Error("Method not implemented.");
    }
    isAM(dateTime: Date): boolean {
        throw new Error("Method not implemented.");
    }
    isPM(dateTime: Date): boolean {
        throw new Error("Method not implemented.");
    }
    addMinutes(date: Date, minutes: number): Date {
        throw new Error("Method not implemented.");
    }
    compareInHours(start_date: Date, end_date: Date): number {
        const diffInMs = end_date.getTime() - start_date.getTime();
        return Math.floor(diffInMs / (1000 * 60 * 60));
    }

    compareInSeconds(start_date: Date, end_date: Date): number {
        const diffInMs = end_date.getTime() - start_date.getTime();
        return Math.floor(diffInMs / 1000);
    }

    calculateDelayWithLunchTime(
        toleranceTime: number,
        lunchStart: Date,
        lunchEnd: Date,
    ): number {
        const diffInMs = lunchEnd.getTime() - lunchStart.getTime();
        const lunchHours = Math.floor(diffInMs / 1000);
        const toleranceTimeInMinutes = toleranceTime * 60;
        return lunchHours - toleranceTimeInMinutes;
    }

    convertToUtc(date: Date): string {
        return date.toISOString();
    }

    calculateDelay(toleranceTime: Date, start_date: Date): number {
        const diffInMs = start_date.getTime() - toleranceTime.getTime();
        if (diffInMs < 0) {
            return 0;
        }
        return Math.floor(diffInMs / 1000);
    }

    currentDateWithTime(hour: number, minute: number, second: number): Date {
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        return date;
    }

    calculateExtraTimeClockedOut(
        end_time: Date,
        toleranceTimeEnd: Date,
    ): number {
        const diffInMs = toleranceTimeEnd.getTime() - end_time.getTime();

        if (diffInMs < 0) {
            return 0;
        }
        return Math.floor(diffInMs / 1000);
    }

    calculateExtraTimeClockedIn(
        start_time: Date,
        toleranceTimeStart: Date,
    ): number {
        const diffInMs = start_time.getTime() - toleranceTimeStart.getTime();

        if (diffInMs < 0) {
            return 0;
        }
        return Math.floor(diffInMs / 1000 + 1);
    }

    calculateExtraTime(
        end_time: Date,
        toleranceTimeEnd: Date,
        start_time: Date,
        toleranceTimeStart: Date,
    ): number {
        const diffInMs = end_time.getTime() - start_time.getTime();
        if (diffInMs < 0) {
            return 0;
        }
        return Math.floor(diffInMs / (1000 * 60));
    }

    convertStrHourToDateTime(hourString: string): Date {
        const [hour, minute] = hourString.split(":");
        const date = new Date();
        date.setHours(Number(hour));
        date.setMinutes(Number(minute));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }

    calculateWorkTime(attendance: ICalculateWorkTime): number {
        const start_date = attendance.clockedIn;
        const end_date = attendance.clockedOut;

        const lunchStart = attendance.lunchStart;
        const lunchEnd = attendance.lunchEnd;

        const totalWorkedHours = this.compareInSeconds(start_date, end_date);

        if (lunchStart && lunchEnd) {
            const lunchHours = this.compareInSeconds(lunchStart, lunchEnd);
            const total = totalWorkedHours - lunchHours;
            return total;
        } else {
            return totalWorkedHours;
        }
    }

    compareInMinutes(start_date: Date, end_date: Date): number {
        const diffInMs = end_date.getTime() - start_date.getTime();
        return Math.floor(diffInMs / (1000 * 60));
    }

    dateNow(): Date {
        return new Date();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const diffInMs = end_date.getTime() - start_date.getTime();
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }

    addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    addHours(date: Date, hours: number): Date {
        date.setHours(date.getHours() + hours);
        return date;
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return start_date.getTime() < end_date.getTime();
    }
}

export { FakeDateProvider };

