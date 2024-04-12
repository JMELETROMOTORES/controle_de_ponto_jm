import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { GenerateReportUseCase } from "./generate-report";
import { makeJourney } from "@/test/factories/make-journey";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeTimeIn } from "@/test/factories/make-time-in";
import { FakeDateProvider } from "@/test/providers/fake-dayjs";
import { PaidAttendanceUseCase } from "./paid-attendance";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import dayjs, { Dayjs } from "dayjs";
import e from "cors";
import { InMemoryHolidayRepository } from "@/test/in-memory-holiday-repository";
import { makeHoliday } from "@/test/factories/make-holiday";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let sut: GenerateReportUseCase;
let entityFinderService: EntityFinderService;
let sut2: PaidAttendanceUseCase
let day = dayjs();
let inMemoryHolidaysRepository: InMemoryHolidayRepository;
let fakeDayjsProvider = new FakeDateProvider();

describe('generateReport', () => {
  beforeEach(() => {
    inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
    inMemoryHolidaysRepository = new InMemoryHolidayRepository();
    inMemoryJourneyRepository = new InMemoryJourneyRepository();
    entityFinderService = new EntityFinderService(
      inMemoryAttendanceRepository,
      inMemoryEmployeeRepository,
      inMemoryJourneyRepository,
    )

    fakeDayjsProvider = new FakeDateProvider();

    sut2 =  new PaidAttendanceUseCase(
      inMemoryAttendanceRepository,
      entityFinderService,
  );

    sut = new GenerateReportUseCase(inMemoryEmployeeRepository, inMemoryAttendanceRepository,inMemoryHolidaysRepository);
  });

  it('should generate a report', async () => {
    const newJourney = makeJourney();
    const newEmployee = makeEmployee({
      journeyId: newJourney.id,
    });
  await inMemoryJourneyRepository.create(newJourney);
  await inMemoryEmployeeRepository.create(newEmployee);
  const firstDayOfMonth = day.startOf('month');
  const lastDayOfMonth = firstDayOfMonth.endOf('month');

  for (let day = firstDayOfMonth; day.isBefore(lastDayOfMonth) || day.isSame(lastDayOfMonth, 'day'); day = day.add(1, 'day')) {

    if (day.day() !== 0 && day.day() !== 6) {
      const clockedIn = day.set('hour', 8).set('minute', 0).set('second', 0).toDate();
      const lunchStart = day.set('hour', 12).toDate();
      const lunchEnd = day.set('hour', 13).toDate();
      const clockedOut = day.set('hour', 18).toDate();

      const newAttendance = makeTimeIn({
        rfid: newEmployee.rfid,
        date: day.toDate(),
        clockedIn: clockedIn,
        lunchStart: lunchStart,
        lunchEnd: lunchEnd,
        clockedOut: clockedOut,
        hoursWorked: 9,
        delay: 10,
        extraHours: 0,
      });

      await inMemoryAttendanceRepository.create(newAttendance);
    }
  }


const response = await sut.execute({ rfid: newEmployee.rfid, startDate: firstDayOfMonth.toDate(), endDate: lastDayOfMonth.toDate() });
expect(response?.value?.report).toBeDefined();
expect(response?.value?.report?.totalDelay).toBe(220);
expect(response?.value?.report?.totalOvertime).toBe(0);
expect(response?.value?.report?.totalWorkedHours).toBe(198);
expect(response?.value?.report?.daysAbsences).toHaveLength(0);
expect(response?.value?.report?.paidAbsences).toHaveLength(0);
console.log(response?.value?.report)
});
it('should generate a report with paid absenses', async () => {
  const newJourney = makeJourney();
  const newEmployee = makeEmployee({
    journeyId: newJourney.id,
  });
  const newHoliday = makeHoliday({
    date: new Date('2024-04-23T03:00:00.000Z'),
  })
await inMemoryHolidaysRepository.create(newHoliday);
await inMemoryJourneyRepository.create(newJourney);
await inMemoryEmployeeRepository.create(newEmployee);
const firstDayOfMonth = day.startOf('month')
const lastDayOfMonth = dayjs().endOf('month')
    let currentDay = firstDayOfMonth;
    let weekdaysProcessed = 0;


    while (weekdaysProcessed < 15) {
      if (currentDay.day() !== 0 && currentDay.day() !== 6) {
        const clockedIn = currentDay.set('hour', 8).set('minute', 0).set('second', 0).toDate();
        const lunchStart = currentDay.set('hour', 12).toDate();
        const lunchEnd = currentDay.set('hour', 13).toDate();
        const clockedOut = currentDay.set('hour', 18).toDate();

        const newAttendance = makeTimeIn({
          rfid: newEmployee.rfid,
          date: currentDay.toDate(),
          clockedIn: clockedIn,
          lunchStart: lunchStart,
          lunchEnd: lunchEnd,
          clockedOut: clockedOut,
          hoursWorked: 9,
          delay: 10,
        });


    await inMemoryAttendanceRepository.create(newAttendance);
    weekdaysProcessed++;
  }

  currentDay = currentDay.add(1, 'day');

  await sut2.execute({
    rfid: newEmployee.rfid,
    date: new Date('2024-04-22T03:00:00.000Z'),
    absenseReason: 'Sick',
  })

  await sut2.execute({
    rfid: newEmployee.rfid,
    date: new Date('2024-04-24T03:00:00.000Z'),
    absenseReason: 'Sick',
  })
  

}

const response = await sut.execute({ rfid: newEmployee.rfid, startDate: firstDayOfMonth.toDate(), endDate: lastDayOfMonth.toDate() });
expect(response?.value?.report).toBeDefined();
// expect(response?.value?.report?.totalDelay).toBe(0);
expect(response?.value?.report?.totalOvertime).toBe(0);
expect(response?.value?.report?.totalWorkedHours).toBe(135);
// expect(response?.value?.report?.paidAbsences).toHaveLength(2);



});

});






