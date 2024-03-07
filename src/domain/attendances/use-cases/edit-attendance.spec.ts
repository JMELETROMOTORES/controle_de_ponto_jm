import { makeAttendance } from "@/test/factories/make-attendance";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { EditAttendanceUseCase } from "./edit-attendance";

let inMemoryAttendancesRepository: InMemoryAttendanceRepository;
let fakeDayjsProvider: FakeDateProvider;

let sut: EditAttendanceUseCase;
let inMemoryJourneyRepository: InMemoryJourneyRepository;

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;

describe("Edit Attendance", () => {
    beforeEach(() => {
        inMemoryAttendancesRepository = new InMemoryAttendanceRepository();
        fakeDayjsProvider = new FakeDateProvider();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new EditAttendanceUseCase(
            inMemoryAttendancesRepository,
            fakeDayjsProvider,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );
    });

    it("should be able to edit a attendance", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        const newAttendance = makeAttendance({
            clockedIn: fakeDayjsProvider.currentDateWithTime(9, 0, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 0, 0),
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 0, 0),
            clockedOut: fakeDayjsProvider.currentDateWithTime(17, 0, 0),
        });
        console.log(newAttendance);

        await inMemoryAttendancesRepository.create(newAttendance);

        const result = await sut.execute({
            id: newAttendance.id.toString(),
            employeeId: newEmployee.id.toString(),
            clockedIn: fakeDayjsProvider.currentDateWithTime(9, 10, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 0, 0),
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 0, 0),
            clockedOut: fakeDayjsProvider.currentDateWithTime(18, 0, 0),
        });

        console.log(result.value);
    });
});

