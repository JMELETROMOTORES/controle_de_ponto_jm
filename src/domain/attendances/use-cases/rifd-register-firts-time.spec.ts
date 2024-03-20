import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { RegisterFirstTimeInAttendanceUseCase } from "./rfid-register-first-time";

import dayjs = require("dayjs");
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let entityFinderService: EntityFinderService;
let delayCalculationService: DelayCalculationService;
let calculateWorkTimeService: WorkTimeCalculationService;
let calculateExtraTime: ExtraTimeCalculationService;
let fakeDayjsProvider: FakeDateProvider;
let sut: RegisterFirstTimeInAttendanceUseCase;

describe("Register time in", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        fakeDayjsProvider = new FakeDateProvider();
        calculateExtraTime = new ExtraTimeCalculationService(fakeDayjsProvider);
        delayCalculationService = new DelayCalculationService(
            fakeDayjsProvider,
        );
        calculateWorkTimeService = new WorkTimeCalculationService(
            fakeDayjsProvider,
        );

        entityFinderService = new EntityFinderService(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );
        sut = new RegisterFirstTimeInAttendanceUseCase(
            inMemoryAttendanceRepository,
            delayCalculationService,
            calculateExtraTime,
            fakeDayjsProvider,
            calculateWorkTimeService,
            entityFinderService,
        );
    });

    it("should register time in", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);

        const result = await sut.execute({
            rfid: newEmployee.rfid,
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].delay).toBe(0);
        expect(inMemoryAttendanceRepository.items[0].extraHours).toBe(0);
    });

    it("should register time in with delay", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);

        const result = await sut.execute({
            rfid: newEmployee.rfid,
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 11, 0),
        });
        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].delay).toBe(60);
    });

    it("should register time in with extra hours", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);

        const result = await sut.execute({
            rfid: newEmployee.rfid,
            clockedIn: fakeDayjsProvider.currentDateWithTime(7, 49, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].delay).toBe(0);
        expect(inMemoryAttendanceRepository.items[0].extraHours).toBe(60);
    });
});

