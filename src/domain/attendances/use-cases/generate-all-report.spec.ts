import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { GenerateReportUseCase } from "./generate-report";
import { makeJourney } from "@/test/factories/make-journey";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeTimeIn } from "@/test/factories/make-time-in";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import dayjs, { Dayjs } from "dayjs";
import e from "cors";
import { InMemoryHolidayRepository } from "@/test/in-memory-holiday-repository";
import { makeHoliday } from "@/test/factories/make-holiday";
import { InMemoryAbsenceAllowanceRepository } from "@/test/in-memory-absence-allowance-repository";
import { makeAbsenceAllowance } from "@/test/factories/make-absence-allowance";
import { GenerateAllReportUseCase } from "./generate-all-report";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let inMemoryAbsenceAllowanceRepository: InMemoryAbsenceAllowanceRepository;
let sut: GenerateAllReportUseCase;
let entityFinderService: EntityFinderService;
let day = dayjs();
let inMemoryHolidaysRepository: InMemoryHolidayRepository;
let fakeDayjsProvider = new FakeDateProvider();

describe('generateReport', () => {
  beforeEach(() => {
    inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
    inMemoryHolidaysRepository = new InMemoryHolidayRepository();
    inMemoryJourneyRepository = new InMemoryJourneyRepository();
    inMemoryAbsenceAllowanceRepository = new InMemoryAbsenceAllowanceRepository();
    entityFinderService = new EntityFinderService(
      inMemoryAttendanceRepository,
      inMemoryEmployeeRepository,
      inMemoryJourneyRepository,
    )

    fakeDayjsProvider = new FakeDateProvider();


    sut = new GenerateAllReportUseCase(inMemoryAttendanceRepository, inMemoryEmployeeRepository,
      inMemoryHolidaysRepository, inMemoryAbsenceAllowanceRepository, new GenerateReportUseCase(inMemoryEmployeeRepository, inMemoryAttendanceRepository, inMemoryHolidaysRepository, inMemoryAbsenceAllowanceRepository)
    )
  });

  it('should generate a report', async () => {
    const newJourney = makeJourney();
    const newEmployee = makeEmployee({
      journeyId: newJourney.id,
    });
  await inMemoryJourneyRepository.create(newJourney);
  await inMemoryEmployeeRepository.create(newEmployee);

  const otherEmployee = makeEmployee({
    journeyId: newJourney.id,
    rfid: '123456',
  })

  await inMemoryEmployeeRepository.create(otherEmployee);

  const firstDayOfMonth = day.startOf('month')
  const lastDayOfMonth = day.endOf('month')


    
  
    const attendace = makeTimeIn({
      rfid: newEmployee.rfid,
      date: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
      clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
      lunchStart: fakeDayjsProvider.currentDateWithTime(12, 0, 0),
      lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 0, 0),
      clockedOut: fakeDayjsProvider.currentDateWithTime(18, 0, 0),
      hoursWorked: 32280,
      delay: 120,
    });

    const otherAttendance = makeTimeIn({
      rfid: otherEmployee.rfid,
      date: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
      clockedIn: fakeDayjsProvider.currentDateWithTime(8, 0, 0),
      lunchStart: fakeDayjsProvider.currentDateWithTime(12, 0, 0),
      lunchEnd: fakeDayjsProvider.currentDateWithTime(13, 0, 0),
      clockedOut: fakeDayjsProvider.currentDateWithTime(18, 0, 0),
      hoursWorked: 32400,
      delay: 120,
    });


    const otherAttendance2 = makeTimeIn({
      rfid: otherEmployee.rfid,
      date: fakeDayjsProvider.dateTomorrow(),
      clockedIn: fakeDayjsProvider.dateTomorrow(),
      lunchStart: fakeDayjsProvider.dateTomorrow(),
      lunchEnd: fakeDayjsProvider.dateTomorrow(),
      clockedOut: fakeDayjsProvider.dateTomorrow(),
      hoursWorked: 32400,
      delay: 120,
    });
await inMemoryAttendanceRepository.create(otherAttendance2);
await inMemoryAttendanceRepository.create(otherAttendance);
await inMemoryAttendanceRepository.create(attendace);

const response = await sut.execute({ startDate: firstDayOfMonth.toDate(), endDate: lastDayOfMonth.toDate() });
console.log(response?.value?.reports);
expect(response?.value?.reports).toBeDefined();


 
  })
})







