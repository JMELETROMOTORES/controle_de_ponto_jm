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

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let inMemoryAbsenceAllowanceRepository: InMemoryAbsenceAllowanceRepository;
let sut: GenerateReportUseCase;
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


    sut = new GenerateReportUseCase(inMemoryEmployeeRepository, inMemoryAttendanceRepository,inMemoryHolidaysRepository,
      inMemoryAbsenceAllowanceRepository
    );
  });

  it('should generate a report', async () => {
    const newJourney = makeJourney();
    const newEmployee = makeEmployee({
      journeyId: newJourney.id,
    });
  await inMemoryJourneyRepository.create(newJourney);
  await inMemoryEmployeeRepository.create(newEmployee);
  const firstDayOfMonth = day.startOf('month')
  const lastDayOfMonth = dayjs().endOf('month')
      let currentDay = firstDayOfMonth;
      let weekdaysProcessed = 0;
  
  
      while (weekdaysProcessed < 29) {
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
            hoursWorked: 32400 ,
            delay: 0,
          });
  
  
      await inMemoryAttendanceRepository.create(newAttendance);
      weekdaysProcessed++;
    }
    
    currentDay = currentDay.add(1, 'day');
  
};
    
  
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

await inMemoryAttendanceRepository.create(attendace);
const response = await sut.execute({ rfid: newEmployee.rfid, startDate: firstDayOfMonth.toDate(), endDate: lastDayOfMonth.toDate() });

expect(response?.value?.report).toBeDefined();


// expect(response?.value?.report?.totalDelay).toBe(220);
// expect(response?.value?.report?.totalOvertime).toBe(0);
// expect(response?.value?.report?.totalWorkedHours).toBe(198);
// expect(response?.value?.report?.daysAbsences).toHaveLength(0);
// expect(response?.value?.report?.paidAbsences).toHaveLength(0);

// it('should generate a report with paid absenses', async () => {
//   const newJourney = makeJourney();
//   const newEmployee = makeEmployee({
//     journeyId: newJourney.id,
//   });
//   const newHoliday = makeHoliday({
//     date: new Date('2024-05-04T03:00:00.000Z'),
//   })

//   const newAbsenceAllowance = makeAbsenceAllowance({
//     employeeId: newEmployee.id.toString(),
//     date: new Date('2024-05-22T03:00:00.000Z'),
//   })

//   const newAbsenceAllowance1 = makeAbsenceAllowance({
//     employeeId: newEmployee.id.toString(),
//     date: new Date('2024-05-23T03:00:00.000Z'),
//   })
// await inMemoryAbsenceAllowanceRepository.create(newAbsenceAllowance);
// await inMemoryAbsenceAllowanceRepository.create(newAbsenceAllowance1);
// await inMemoryHolidaysRepository.create(newHoliday);
// await inMemoryJourneyRepository.create(newJourney);
// await inMemoryEmployeeRepository.create(newEmployee);
// const firstDayOfMonth = day.startOf('month')
// const lastDayOfMonth = dayjs().endOf('month')
//     let currentDay = firstDayOfMonth;
//     let weekdaysProcessed = 0;


//     while (weekdaysProcessed < 15) {
//       if (currentDay.day() !== 0 && currentDay.day() !== 6) {
//         const clockedIn = currentDay.set('hour', 8).set('minute', 0).set('second', 0).toDate();
//         const lunchStart = currentDay.set('hour', 12).toDate();
//         const lunchEnd = currentDay.set('hour', 13).toDate();
//         const clockedOut = currentDay.set('hour', 18).toDate();

//         const newAttendance = makeTimeIn({
//           rfid: newEmployee.rfid,
//           date: currentDay.toDate(),
//           clockedIn: clockedIn,
//           lunchStart: lunchStart,
//           lunchEnd: lunchEnd,
//           clockedOut: clockedOut,
//           hoursWorked: 9,
//           delay: 10,
//         });


//     await inMemoryAttendanceRepository.create(newAttendance);
//     weekdaysProcessed++;
//   }

//   currentDay = currentDay.add(1, 'day');

//   await sut2.execute({
//     rfid: newEmployee.rfid,
//     date: new Date('2024-04-22T03:00:00.000Z'),
//     absenseReason: 'Sick',
//   })

//   await sut2.execute({
//     rfid: newEmployee.rfid,
//     date: new Date('2024-04-24T03:00:00.000Z'),
//     absenseReason: 'Sick',
//   })
  

// }

// const response = await sut.execute({ rfid: newEmployee.rfid, startDate: firstDayOfMonth.toDate(), endDate: lastDayOfMonth.toDate() });
// expect(response?.value?.report).toBeDefined();
// // expect(response?.value?.report?.totalDelay).toBe(0);
// expect(response?.value?.report?.totalOvertime).toBe(0);
// expect(response?.value?.report?.totalWorkedHours).toBe(135);
// // expect(response?.value?.report?.paidAbsences).toHaveLength(2);

// console.log(response?.value?.report);

// });

 
  })
})







