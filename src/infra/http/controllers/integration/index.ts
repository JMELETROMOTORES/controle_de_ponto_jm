// import { IntegrationSchedulesController } from "./integration-schedules-controller";
// import { IntegrationSchedulesUseCase } from "@/domain/attendances/use-cases/ingration-schedules";
// import { EmployeePrismaRepository } from "@/infra/database/repositories/prisma-employee-repository";
// import { AttendancePrismaRepository } from "@/infra/database/repositories/prisma-attendance-repository";

// import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
// import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
// import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
// import { EntityFinderService } from "@/domain/services/entity-finder-service";
// import { JourneyPrismaRepository } from "@/infra/database/repositories/prisma-journey-repository";
// import { DayjsDateProvider } from "@/domain/attendances/providers/implementations/DayJsProvider";

// const dayjsProvider = new DayjsDateProvider();
// const attendanceRepository = new AttendancePrismaRepository();
// const delayCalculationService = new DelayCalculationService(dayjsProvider);
// const calculaExtraTimeService = new ExtraTimeCalculationService(dayjsProvider);
// const calculateWorkTimeService = new WorkTimeCalculationService(dayjsProvider);
// const journeyPrismaRepository = new JourneyPrismaRepository();
// const employeePrismaRepository = new EmployeePrismaRepository();
// const entityFinderService = new EntityFinderService(attendanceRepository, employeePrismaRepository, journeyPrismaRepository);

// const integrationSchedulesUseCase = new IntegrationSchedulesUseCase(attendanceRepository,
//   delayCalculationService,
//   calculaExtraTimeService,
//   dayjsProvider,
//   calculateWorkTimeService,
//   entityFinderService,);



// const integrationSchedulesController = new IntegrationSchedulesController(
//   integrationSchedulesUseCase,
// );

// export { integrationSchedulesController };