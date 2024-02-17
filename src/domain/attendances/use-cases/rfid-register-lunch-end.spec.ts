import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { RegisterLunchEndAttendanceUseCase } from "./rifd-register-lunch-end";

import dayjs = require("dayjs");
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: RegisterLunchEndAttendanceUseCase;

describe("Create Employee Use Case", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new RegisterLunchEndAttendanceUseCase(
            inMemoryAttendanceRepository,
        );
    });

    it("should register time out", async () => {
        const newAttendance = makeTimeIn({
            lunchStart: dayjs("2024-02-12 12:30:00").toDate(),
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            rfid: "123",
            lunchEnd: dayjs("2024-02-12 13:30:00").toDate(),
        });

        console.log(inMemoryAttendanceRepository.items);

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
    });
});

