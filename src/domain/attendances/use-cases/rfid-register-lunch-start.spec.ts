import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { InMemoryJourneyRepository } from "../../../test/in-memory-journey-repository";
import { RegisterLunchStartAttendanceUseCase } from "./rfid-register-lunch-start";
import dayjs = require("dayjs");
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryJourneyRepository = new InMemoryJourneyRepository();
let sut: RegisterLunchStartAttendanceUseCase;
let fakeDayjsProvider = new FakeDateProvider();
describe("Register lunch time", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new RegisterLunchStartAttendanceUseCase(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
        );
    });

    it("should register lunch time", async () => {
        const newJourney = makeJourney();
        const newEmployee = makeEmployee({
            journeyId: newJourney.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        await inMemoryJourneyRepository.create(newJourney);

        const newAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            id: newAttendance.id.toString(),
            rfid: newEmployee.rfid,
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
    });
});

