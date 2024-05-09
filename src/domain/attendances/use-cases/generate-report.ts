import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { IPaidAbs, Reports } from "../entities/value-objects/reports";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { AttendanceRepository } from "../repositories/attendance-repository";
import dayjs from "dayjs";
import { IDateProvider } from "../providers/IDateProvider";
import { HolidayRepository } from "@/domain/holidays/repositories/holiday-repository";
import { AbsenceAllowanceRepository } from "@/domain/absence-allowance/repositories/absence-allowance-repository";



export interface IGenerateReportUseCaseDTO {
    rfid: string;
    startDate: Date;
    endDate: Date;
}

type GenerateReportUseCaseResponse = Either<null, {
    report: Reports;
}>

export class GenerateReportUseCase implements IUseCase<IGenerateReportUseCaseDTO,GenerateReportUseCaseResponse > {
  constructor(private readonly employeeRepository: EmployeeRepository,
    private readonly attendanceRepository: AttendanceRepository,
    private readonly holidayRepository: HolidayRepository,
    private readonly absenceAllowanceRepository: AbsenceAllowanceRepository) {}
    async execute({ rfid, startDate, endDate }: IGenerateReportUseCaseDTO): Promise<GenerateReportUseCaseResponse> {

        const employee =  await this.employeeRepository.findByRfid(rfid);
        console.log(employee)
        if(!employee){
            return left(null);
        }

        const attendance = await this.attendanceRepository.generateReport(employee.rfid, startDate, endDate);
        console.log(attendance)
        if(!attendance){
            return left(null);
        }

    
    
        let totalDelay = 0;
        let totalOvertime = 0;
        let totalWorkedHours = 0;
        const paidAbsences = [];
        const daysAbsences = [];
        let workDaysAndSchedules = [];
        
        totalDelay = attendance.reduce((acc, attendance) => acc + attendance.delay, 0);
        totalOvertime = attendance.reduce((acc, attendance) => acc + attendance.extraHours, 0);
        totalWorkedHours = attendance.reduce((acc, attendance) => acc + attendance.hoursWorked, 0);
        workDaysAndSchedules = attendance
        .map(record => ({
          date: record.date,
          clockedIn: record.clockedIn,
          lunchStart: record.lunchStart,
          lunchEnd: record.lunchEnd,
          clockedOut: record.clockedOut,
          hoursWorked: record.hoursWorked,
            delay: record.delay,
            overtime: record.extraHours
        }));
        const holidays = await this.holidayRepository.findHolidaysBetween(startDate, endDate);
        const holidaysDates = new Set(holidays.map(holiday => dayjs(holiday.date).format('YYYY-MM-DD')));
        const absenceAllowance = await this.absenceAllowanceRepository.findByEmployeeId(employee.id.toString()) 
        if(!absenceAllowance) {
            return left(null);
        }
        const absenceAllowanceDates = new Set(absenceAllowance.map(absenceAllowance => dayjs(absenceAllowance.date).format('YYYY-MM-DD')));
        if(!absenceAllowance){
            return left(null);
        }

        let currentDate = dayjs(startDate);
        let endDateDayjs = dayjs(endDate);
        while (currentDate.isBefore(endDateDayjs) || currentDate.isSame(endDateDayjs, 'day')) {
        const attendanceDateStrings = attendance.map(record => dayjs(record.clockedIn).format('YYYY-MM-DD'));
        const formattedCurrentDate = currentDate.format('YYYY-MM-DD');

        if(!holidaysDates.has(formattedCurrentDate) && !absenceAllowanceDates.has(formattedCurrentDate)){
            if (!attendanceDateStrings.includes(formattedCurrentDate)) {
        
                if (currentDate.day() !== 0 && currentDate.day() !== 6) {
                daysAbsences.push( currentDate.toDate() );
            }
        } 
        
    
        } 
        
        currentDate = currentDate.add(1, 'day');
    }
    const absences = daysAbsences.length;
        const report = Reports.create({
            employeeName: employee.name,
            interval: `${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(endDate).format('DD/MM/YYYY')}`,
            totalDelay,
            totalOvertime,
            totalWorkedHours,
            absences,
            paidAbsences: absenceAllowance.map(absenceAllowance => {
                return {
                    date: absenceAllowance.date,
                    absenseReason: absenceAllowance.reason
                }
            }),
            workDays: workDaysAndSchedules,
            daysAbsences
        });
    
        return right({ report });
        
    }
}