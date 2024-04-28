import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { InMemoryJourneyRepository } from "../../../test/in-memory-journey-repository";
import { RegisterLunchStartAttendanceUseCase } from "./rfid-register-lunch-start";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let delayCalculationService: DelayCalculationService;
let calculateWorkTimeService: WorkTimeCalculationService;
let sut: RegisterLunchStartAttendanceUseCase;
let entityFinderService: EntityFinderService;
let fakeDayjsProvider = new FakeDateProvider();
describe("Register lunch time", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        entityFinderService = new EntityFinderService(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );
        sut = new RegisterLunchStartAttendanceUseCase(
            inMemoryAttendanceRepository,
            delayCalculationService,
            calculateWorkTimeService,
            fakeDayjsProvider,
            entityFinderService,
        );
    });

    it("should register lunch time", async () => {
        const newJourney = makeJourney();
        const newEmployee = makeEmployee({
            journeyId: newJourney.id,
        });

        const newEmployee2 = makeEmployee({
            journeyId: newJourney.id,
            rfid: "123456789",
        })

        await inMemoryEmployeeRepository.create(newEmployee2);
        await inMemoryEmployeeRepository.create(newEmployee);
        await inMemoryJourneyRepository.create(newJourney);

        const newAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
        });

        const otherAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
            rfid: newEmployee2.rfid,
        })
        await inMemoryAttendanceRepository.create(otherAttendance);
        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            rfid: newEmployee.rfid,
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
        });
    

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(2);
        console.log(inMemoryAttendanceRepository.items);
    });
});

