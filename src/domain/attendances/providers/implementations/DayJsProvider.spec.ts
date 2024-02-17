import { DayjsDateProvider } from "./DayJsProvider";

describe("DayjsDateProvider", () => {
    let dateProvider: DayjsDateProvider;

    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
    });

    describe("compareInHours", () => {
        it("should return the difference in hours between two dates", () => {
            const start_date = new Date("2022-01-01T10:00:00Z");
            const end_date = new Date("2022-01-01T12:20:00Z");

            const result = dateProvider.compareInHours(start_date, end_date);

            expect(result).toBe(2);
        });

        it("should return the difference in minutes between two dates", () => {
            const start_date = new Date("2022-01-01T10:00:00Z");
            const end_date = new Date("2022-01-01T12:00:00Z");

            const result = dateProvider.compareInMinutes(start_date, end_date);

            expect(result).toBe(120);
        });
    });
});

