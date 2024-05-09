import { makeTimeIn } from "@/test/factories/make-time-in";
import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";

import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeJourney } from "@/test/factories/make-journey";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { RegisterClockedOutAttendanceUseCase } from "./rifd-register-clocked-out";

let sut: RegisterClockedOutAttendanceUseCase;
let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;

let entityFinderService: EntityFinderService;

let calculateExtraTime: ExtraTimeCalculationService;
let calculateWorkTime: WorkTimeCalculationService;
let fakeDayjsProvider: FakeDateProvider;
describe("Register time out", () => {
    beforeEach(() => {
        fakeDayjsProvider = new FakeDateProvider(); 

        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        calculateExtraTime = new ExtraTimeCalculationService(fakeDayjsProvider);
        calculateWorkTime = new WorkTimeCalculationService(fakeDayjsProvider);
        entityFinderService = new EntityFinderService(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );

        sut = new RegisterClockedOutAttendanceUseCase(
            entityFinderService,
            calculateExtraTime,
            calculateWorkTime,
            inMemoryAttendanceRepository,
        );
    });

    it("should register time out", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        const newAttendance = makeTimeIn({
            date: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
            clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 30, 0),
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({
            rfid: "123",
            clockedOut: fakeDayjsProvider.currentDateWithTime(18, 0, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].hoursWorked).toBe(32400); // SEGUNDOS EM HORAS ( 9 HORAS )
    });

    it("should register time out with extra time acc extra time clockedIn", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
            journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);
        const newAttendance = makeTimeIn({
            date: fakeDayjsProvider.currentDateWithTime(9, 0, 0),
            clockedIn: fakeDayjsProvider.currentDateWithTime(7, 30, 0),
            lunchStart: fakeDayjsProvider.currentDateWithTime(12, 30, 0),
            lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 30, 0),
        });

        await inMemoryAttendanceRepository.create(newAttendance);

        const result = await sut.execute({

            rfid: "123",
            clockedOut: fakeDayjsProvider.currentDateWithTime(19, 0, 0),
        });

        expect(result.isRight()).toBeTruthy();
        expect(inMemoryAttendanceRepository.items.length).toBe(1);
        expect(inMemoryAttendanceRepository.items[0].hoursWorked).toBe(37800); // 9 horas
        expect(inMemoryAttendanceRepository.items[0].extraHours).toBe(4200); // 50 minutos
    });
});

