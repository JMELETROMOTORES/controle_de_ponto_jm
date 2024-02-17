import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { RegisterTimeInAttendanceUseCase } from "./rfid-register-clocked-in";
import dayjs = require("dayjs");
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: RegisterTimeInAttendanceUseCase;

describe("Register time in", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new RegisterTimeInAttendanceUseCase(inMemoryAttendanceRepository);
    });

    it("should register time in", async () => {
        const result = await sut.execute({
            rfid: "123",
        });
        console.log(inMemoryAttendanceRepository.items);
        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
    });
});

