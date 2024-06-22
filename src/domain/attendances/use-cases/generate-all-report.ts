import { Either, left, right } from "@/core/either";
import { AllReports } from "../entities/value-objects/all-reports";
import { IUseCase } from "@/core/protocols/IUseCase";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { HolidayRepository } from "@/domain/holidays/repositories/holiday-repository";
import dayjs from "dayjs";
import { AbsenceAllowanceRepository } from "@/domain/absence-allowance/repositories/absence-allowance-repository";
import { GenerateReportUseCase } from "./generate-report";

export interface IGenerateAllReportUseCaseDTO {
    startDate: Date;
    endDate: Date;
}

type GenerateAllReportUseCaseResponse = Either<null, {
  reports: AllReports[];
}>

export class GenerateAllReportUseCase implements IUseCase<IGenerateAllReportUseCaseDTO, GenerateAllReportUseCaseResponse> {
  constructor(private readonly attendanceRepository: AttendanceRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly holidayRepository: HolidayRepository,
    private readonly absenceAllowanceRepository: AbsenceAllowanceRepository,
    private readonly generateReportUseCase: GenerateReportUseCase
  ) {}

  async execute({ startDate, endDate}: IGenerateAllReportUseCaseDTO): Promise<GenerateAllReportUseCaseResponse> {
    const employees = await this.employeeRepository.findMany();

    if (!employees || employees.length === 0) {
      return left(null);
    
  }

  const reports: AllReports[] = [];

  for(const employee of employees) {
    const report = await this.generateReportUseCase.execute({
      rfid: employee.rfid,
      startDate,
      endDate,
    });

    if (report.isLeft()) {
      return left(null);
    }

    let totalDelay = 0;
    let totalOvertime = 0;
    let totalWorkedHours = 0;
    let totalAbsences = 0;
    totalDelay = report.value.report.totalDelay;
    totalOvertime = report.value.report.totalOvertime;
    totalWorkedHours = report.value.report.totalWorkedHours;
    totalAbsences = report.value.report.absences;

    const uniReport = AllReports.create({
      employeeName: employee.name,
      totalDelay,
      totalOvertime,
      totalWorkedHours,
      absences: totalAbsences,
    })

    reports.push(uniReport);

  }

  return right({ reports }); 

}
}
