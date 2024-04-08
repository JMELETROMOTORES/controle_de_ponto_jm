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
import { PaidAttendanceUseCase } from "./paid-attendance";


let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let entityFinderService: EntityFinderService;
let sut: PaidAttendanceUseCase;
let fakeDayjsProvider = new FakeDateProvider();

describe("Register time in", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
       fakeDayjsProvider = new FakeDateProvider();
        entityFinderService = new EntityFinderService(
            inMemoryAttendanceRepository,
            inMemoryEmployeeRepository,
            inMemoryJourneyRepository,
        );
        sut = new PaidAttendanceUseCase(
            inMemoryAttendanceRepository,
            entityFinderService,
        );
    });

    it("register paid absense", async () => {
        const Journey = makeJourney();
        await inMemoryJourneyRepository.create(Journey);
        const newEmployee = makeEmployee({
          journeyId: Journey.id,
        });
        await inMemoryEmployeeRepository.create(newEmployee);

        const result = await sut.execute({
          rfid: newEmployee.rfid,
          absenseReason: "Doente",
          date: fakeDayjsProvider.dateTomorrow(),
        });

        console.log(inMemoryAttendanceRepository.items);
        
        expect(result.isRight()).toBeTruthy();
        if (!result.isLeft()) {
          expect(result.value.abonos).toBeTruthy();
        }
    });

});

