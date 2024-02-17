import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { RegisterTimeInAttendanceUseCase } from "./rfid-register-clocked-in";
import { RegisterLunchStartAttendanceUseCase } from "./rfid-register-lunch-start";
import dayjs = require("dayjs");
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: RegisterLunchStartAttendanceUseCase;
let sut2: RegisterTimeInAttendanceUseCase;

describe("Create Employee Use Case", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new RegisterLunchStartAttendanceUseCase(
            inMemoryAttendanceRepository,
        );
        sut2 = new RegisterTimeInAttendanceUseCase(
            inMemoryAttendanceRepository,
        );
    });

    it("should register time out", async () => {
        const newAttendance = makeTimeIn({
            clockedIn: dayjs("2024-02-12 8:00:00").toDate(),
        });

        await inMemoryAttendanceRepository.create(newAttendance);
        console.log(inMemoryAttendanceRepository.items);

        const result = await sut.execute({
            rfid: "123",
            lunchStart: dayjs("2024-02-12 12:30:00").toDate(),
        });

        console.log(inMemoryAttendanceRepository.items);

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
    });
});

