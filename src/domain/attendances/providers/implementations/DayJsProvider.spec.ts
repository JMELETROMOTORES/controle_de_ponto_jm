import { DayjsDateProvider } from "./DayJsProvider";

describe("DayjsDateProvider", () => {
    let dateProvider: DayjsDateProvider;

    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
    });

    describe("compareInHours", () => {
        it("should return the difference in hours between two dates", () => {
            const start_date = new Date("2022-01-01T10:00:00Z");
            const end_date = new Date("2022-01-01T11:00:00Z");

            const result = dateProvider.compareInMinutes(start_date, end_date);

            expect(result).toBe(60);
        });

        it("should return the difference in minutes between two dates", () => {
            const start_date = new Date("2022-01-01T10:00:00Z");
            const end_date = new Date("2022-01-01T12:00:00Z");

            const result = dateProvider.compareInMinutes(start_date, end_date);

            expect(result).toBe(120);
        });
    });

    describe("isTimeOfDateBetween", () => {
        it("should return true if compareDateTime is between firstDateTime and secondDateTime", () => {
            const compareDateTime = new Date("2022-01-01T12:00:00Z");
            const firstDateTime = new Date("2022-01-01T10:00:00Z");
            const secondDateTime = new Date("2022-01-01T14:00:00Z");

            const result = dateProvider.isTimeOfDateBetween(
                compareDateTime,
                firstDateTime,
                secondDateTime,
            );

            expect(result).toBe(true);
        });

        it("should return false if compareDateTime is not between firstDateTime and secondDateTime", () => {
            const compareDateTime = new Date("2022-01-01T09:00:00Z");
            const firstDateTime = new Date("2022-01-01T10:00:00Z");
            const secondDateTime = new Date("2022-01-01T14:00:00Z");

            const result = dateProvider.isTimeOfDateBetween(
                compareDateTime,
                firstDateTime,
                secondDateTime,
            );

            expect(result).toBe(false);
        });
    });

    describe("convertStrHourToDateTime", () => {
        it("should return a valid Date object for a valid hourString", () => {
            const hourString = "09:30";
            const result = dateProvider.convertStrHourToDateTime(hourString);
            expect(result).toBeInstanceOf(Date);
            if (result) {
                expect(result.getHours()).toBe(6);
                expect(result.getMinutes()).toBe(30);
            }
        });

        it("should return a valid Date object with default seconds and milliseconds", () => {
            const hourString = "12:45";
            const result = dateProvider.convertStrHourToDateTime(hourString);
            expect(result).toBeInstanceOf(Date);
            if (result) {
                expect(result.getSeconds()).toBe(0);
                expect(result.getMilliseconds()).toBe(0);
            }
        });
    });

    describe("calculateDelay", () => {
        it("should return the difference in minutes between two dates", () => {
            const start_date = new Date("2022-01-01T10:00:00Z");
            const toleranceTime = new Date("2022-01-01T10:00:00Z");

            const result = dateProvider.calculateDelay(
                toleranceTime,
                start_date,
            );

            expect(result).toBe(0);
        });
    });

    describe("calculateDelayWithLunchTime", () => {
        it("should return the difference in minutes between two dates", () => {
            const lunchStart = new Date("2022-01-01T12:00:00Z");
            const lunchEnd = new Date("2022-01-01T13:10:00Z");
            const toleranceTime = 60;

            const result = dateProvider.calculateDelayWithLunchTime(
                toleranceTime,
                lunchStart,
                lunchEnd,
            );

            expect(result).toBe(600);
        });
    });
});

