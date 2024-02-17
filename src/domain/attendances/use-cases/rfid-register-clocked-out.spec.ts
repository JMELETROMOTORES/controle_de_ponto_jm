import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";

import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { RegisterClockedOutAttendanceUseCase } from "./rifd-register-clocked-out";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: RegisterClockedOutAttendanceUseCase;

let fakeDayjsProvider: FakeDateProvider;

describe("Create Employee Use Case", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        fakeDayjsProvider = new FakeDateProvider();
        sut = new RegisterClockedOutAttendanceUseCase(
            inMemoryAttendanceRepository,
            fakeDayjsProvider,
        );
    });

    it("should register time out", async () => {
        const newAttendance = makeTimeIn({
            date: fakeDayjsProvider.currentDateWithTime(8, 10, 0), // Horário desejado
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 50, 0), // Horário desejado
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0), // Horário desejado
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 30, 0), // Horário desejado
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            rfid: "123",
            clockedOut: fakeDayjsProvider.currentDateWithTime(18, 0, 0),
        });

        console.log(inMemoryAttendanceRepository.items);

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].hoursWorked).toBe(490); // 8 hours and 10 minutes;
    });
});

