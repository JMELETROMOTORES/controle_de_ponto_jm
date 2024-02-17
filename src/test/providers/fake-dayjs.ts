import {
    ICalculateWorkTime,
    IDateProvider,
} from "@/domain/attendances/providers/IDateProvider";

class FakeDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const diffInMs = end_date.getTime() - start_date.getTime();
        return Math.floor(diffInMs / (1000 * 60 * 60));
    }

    convertToUtc(date: Date): string {
        return date.toISOString();
    }

    calculateDelay(toleranceTime: Date, start_date: Date): number {
        console.log(toleranceTime, start_date);
        const diffInMs = Math.abs(
            start_date.getTime() - toleranceTime.getTime(),
        );
        return Math.floor(diffInMs / (1000 * 60));
    }

    currentDateWithTime(hour: number, minute: number, second: number): Date {
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        return date;
    }

    calculateExtraTime(
        start_time: Date,
        end_time: Date,
        toleranceTimeStart: Date,
        toleranceTimeEnd: Date,
    ): number {
        const diffInMs = Math.abs(end_time.getTime() - start_time.getTime());
        return Math.floor(diffInMs / (1000 * 60));
    }

    calculateWorkTime(attendance: ICalculateWorkTime): number {
        const start_date = attendance.clockedIn;
        const end_date = attendance.clockedOut;

        const lunchStart = attendance.lunchStart;
        const lunchEnd = attendance.lunchEnd;

        const totalWorkedHours = this.compareInMinutes(start_date, end_date);
        const lunchHours = this.compareInMinutes(
            lunchStart || new Date(),
            lunchEnd || new Date(),
        );

        return totalWorkedHours - lunchHours;
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

    addDays(days: number): Date {
        const date = this.dateNow();
        date.setDate(date.getDate() + days);
        return date;
    }

    addHours(hours: number): Date {
        const date = this.dateNow();
        date.setHours(date.getHours() + hours);
        return date;
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return start_date.getTime() < end_date.getTime();
    }
}

export { FakeDateProvider };

