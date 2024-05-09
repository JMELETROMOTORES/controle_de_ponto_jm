import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { EditFirstTimeUseCase } from "./edit-firts-time";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let calculateExtraTime: ExtraTimeCalculationService;
let delayCalculationService: DelayCalculationService;
let calculateWorkTimeService: WorkTimeCalculationService;
let entityFinderService: EntityFinderService;
let sut: EditFirstTimeUseCase;
let fakeDayjsProvider = new FakeDateProvider();

describe("Edit firts time", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        calculateWorkTimeService = new WorkTimeCalculationService(
            fakeDayjsProvider,
        );
        entityFinderService = new EntityFinderService(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );
        calculateExtraTime = new ExtraTimeCalculationService(fakeDayjsProvider);
        delayCalculationService = new DelayCalculationService(
            fakeDayjsProvider,
        );
        fakeDayjsProvider = new FakeDateProvider();

        sut = new EditFirstTimeUseCase(
            inMemoryAttendanceRepository,
            entityFinderService,
            delayCalculationService,
            calculateExtraTime,
            calculateWorkTimeService,
        );
    });

    it("should edit the first time of an attendance", async () => {
        const newJourney = makeJourney();
        const newEmployee = makeEmployee({
            journeyId: newJourney.id,
        });

        await inMemoryJourneyRepository.create(newJourney);
        await inMemoryEmployeeRepository.create(newEmployee);

        const newAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 0, 0),
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 0, 0),
            clockedOut: fakeDayjsProvider.currentDateWithTime(18, 0, 0),
            delay: 0,
            extraHours: 0,
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const response = await sut.execute({
            attendanceId: newAttendance.id.toString(),
            rfid: newEmployee.rfid,
            newTime: fakeDayjsProvider.currentDateWithTime(7, 49, 0),
        });
        console.log(inMemoryAttendanceRepository.items[0])
        expect(inMemoryAttendanceRepository.items[0].extraHours).toBe(60);
        expect(response.isRight()).toBeTruthy();
    });
});

