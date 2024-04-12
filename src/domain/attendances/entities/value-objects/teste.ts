import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { Reports } from "../entities/value-objects/reports";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { AttendanceRepository } from "../repositories/attendance-repository";
import dayjs from "dayjs";
import { IDateProvider } from "../providers/IDateProvider";
const year = new Date().getFullYear(); // Obtém o ano atual


export interface IGenerateReportUseCaseDTO {
    rfid: string;
    startDate: Date;
    endDate: Date;
}

type GenerateReportUseCaseResponse = Either<null, {
    report: Reports;
}>

export class GenerateReport implements IUseCase<IGenerateReportUseCaseDTO,GenerateReportUseCaseResponse > {
  constructor(private readonly employeeRepository: EmployeeRepository,
    private readonly attendanceRepository: AttendanceRepository,
    private readonly dateProvider: IDateProvider) {}
    async execute({ rfid, startDate, endDate }: IGenerateReportUseCaseDTO): Promise<GenerateReportUseCaseResponse> {
        const employee =  await this.employeeRepository.findByRfid(rfid);

        if(!employee){
            return left(null);
        }

        const attendance = await this.attendanceRepository.generateReport(rfid, startDate, endDate);
    

        
        if(!attendance){
            return left(null);
        }


    
        let totalDelay = 0;
        let totalOvertime = 0;
        let totalWorkedHours = 0;
    
            
        
        totalDelay = attendance.reduce((acc, attendance) => acc + attendance.delay, 0);
        totalOvertime = attendance.reduce((acc, attendance) => acc + attendance.extraHours, 0);
        totalWorkedHours = attendance.reduce((acc, attendance) => acc + attendance.hoursWorked, 0);



          const paidAbsences = [];
        const daysAbsences = [];
        
        let currentDate = dayjs(startDate);
        const endDateDayjs = dayjs(endDate);
        while (currentDate.isBefore(endDateDayjs) || currentDate.isSame(endDateDayjs, 'day')) {
            const formattedCurrentDate = currentDate.format('YYYY-MM-DD');
            const attendanceRecordFound = attendance.some(record => dayjs(record.date).format('YYYY-MM-DD') === formattedCurrentDate);
            
            if (!attendanceRecordFound) {
                daysAbsences.push({ date: currentDate.toDate() });
            } else {
                const paidAbsenceRecord = attendance.find(record => dayjs(record.date).format('YYYY-MM-DD') === formattedCurrentDate && record.paid);
                if (paidAbsenceRecord) {
                    paidAbsences.push({ date: currentDate.toDate() });
                }
            }
            currentDate = currentDate.add(1, 'day');
        }


    const absences = daysAbsences.length;

        const report = Reports.create({
            employeeId: employee.id,
            totalDelay,
            totalOvertime,
            totalWorkedHours,
            absences,
            paidAbsences,
            daysAbsences
        });
        
        
        return right({ report });
        
    }
}