import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { DelayCalculationService } from "./../../services/delay-calculation-service";
import { EntityFinderService } from "./../../services/entity-finder-service";
import { RegisterLunchEndAttendanceUseCase } from "./rifd-register-lunch-end";

import dayjs = require("dayjs");
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: RegisterLunchEndAttendanceUseCase;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let entityFinderService: EntityFinderService;
let calculateworkTimeService: WorkTimeCalculationService;
let delayCalculationService: DelayCalculationService;
let fakeDayjsProvider: FakeDateProvider;

describe("Register LunchEnd", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        fakeDayjsProvider = new FakeDateProvider();
        calculateworkTimeService = new WorkTimeCalculationService(
            fakeDayjsProvider,
        );
        delayCalculationService = new DelayCalculationService(
            fakeDayjsProvider,
        );

        entityFinderService = new EntityFinderService(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );
        sut = new RegisterLunchEndAttendanceUseCase(
            entityFinderService,
            delayCalculationService,
            calculateworkTimeService,
            inMemoryAttendanceRepository,
        );
    });

    it("should register lunch time", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        const newAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
        });

        await inMemoryAttendanceRepository.create(newAttendance);
        const result = await sut.execute({
            id: newAttendance.id.toString(),
            rfid: newEmployee.rfid,
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 30, 0),
        });
        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].delay).toBe(0);
    });

    it("should be register lunch end with delay", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        const newAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            id: newAttendance.id.toString(),
            rfid: newEmployee.rfid,
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 40, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].delay).toBe(600);
    });

    it("should be register lunch end with delay acc delay with clocked in", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        const newAttendance = makeTimeIn({
            clockedIn: fakeDayjsProvider.currentDateWithTime(10, 0, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            id: newAttendance.id.toString(),
            rfid: newEmployee.rfid,
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 40, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].delay).toBe(7200);
    });
});

