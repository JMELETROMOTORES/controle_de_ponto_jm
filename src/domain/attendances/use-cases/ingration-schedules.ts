import { IUseCase } from "@/core/protocols/IUseCase";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import axios from "axios";
import { RegisterFirstTimeInAttendanceUseCase } from "./rfid-register-first-time";
import { registerClockedInAttendanceController } from "@/infra/http/controllers/attendance";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { IDateProvider } from "../providers/IDateProvider";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importe o plugin UTC
import { RegisterLunchStartAttendanceUseCase } from "./rfid-register-lunch-start";
import { RegisterLunchEndAttendanceUseCase } from "./rifd-register-lunch-end";
import { RegisterClockedOutAttendanceUseCase } from "./rifd-register-clocked-out";

dayjs.extend(utc); // Ative o plugin UTC

export class IntegrationSchedulesUseCase {
  constructor(private readonly attendanceRepository: AttendanceRepository,
    private readonly calculateDelayService: DelayCalculationService,
    private readonly calculaExtraTimeService: ExtraTimeCalculationService,
    private readonly dateProvider: IDateProvider,
    private readonly calculateWorkTimeService: WorkTimeCalculationService,
    private entityFinderService: EntityFinderService,) {}


  async execute(employeeRfid: string): Promise<void> {
    const fetchSchedulesUrl = `http://localhost:3333/schedules/employee/${employeeRfid}`;

    const schedules = await axios.get(fetchSchedulesUrl);
    for(const schedule of schedules.data) {


      const registerFirstTimeInAttendanceUseCase = new RegisterFirstTimeInAttendanceUseCase(
        this.attendanceRepository,
        this.calculateDelayService,
        this.calculaExtraTimeService,
        this.dateProvider,
        this.calculateWorkTimeService,
        this.entityFinderService,
      );

    
      const registerLunchStartAttendanceUseCase = new RegisterLunchStartAttendanceUseCase(this.attendanceRepository,
        this.calculateDelayService,
        this.calculateWorkTimeService,
        this.dateProvider,
        this.entityFinderService,)

      const adjustedClockedInAt = new Date(dayjs.utc(schedule.clockedInAt).subtract(3, 'hour').toISOString());

      const result = await registerFirstTimeInAttendanceUseCase.execute({
        rfid: employeeRfid,
        clockedIn: adjustedClockedInAt, 
      });

      if(result.isRight()) {
        const lunch = await registerLunchStartAttendanceUseCase.execute({
          id: result.value.attendance?.id.toString(),
          rfid: employeeRfid,
          lunchStart: new Date(dayjs.utc(schedule.lunchStartAt).subtract(3, 'hour').toISOString()),
        })

        if(lunch.isRight()) {
          const registerLunchEndAttendanceUseCase = new RegisterLunchEndAttendanceUseCase(
            this.entityFinderService,
            this.calculateDelayService,
            this.calculateWorkTimeService,
            this.attendanceRepository,
          );

           const lunchend = await registerLunchEndAttendanceUseCase.execute({
            id: result.value.attendance?.id.toString(),
            rfid: employeeRfid,
            lunchEnd: new Date(dayjs.utc(schedule.lunchEndAt).subtract(3, 'hour').toISOString()),
          })

          if(lunchend.isRight()) {
            const registerClockedOutAttendanceUseCase = new RegisterClockedOutAttendanceUseCase(
              this.entityFinderService,
              this.calculaExtraTimeService, 
              this.calculateWorkTimeService,
              this.attendanceRepository,
      
            )
            
            await registerClockedOutAttendanceUseCase.execute({
              id: result.value.attendance?.id.toString(),
              rfid: employeeRfid,
              clockedOut: new Date(dayjs.utc(schedule.clockedOutAt).subtract(3, 'hour').toISOString()),
            })
          }
        }
      }


    }

  }
}
