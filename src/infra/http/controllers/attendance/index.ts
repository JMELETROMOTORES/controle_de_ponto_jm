import { OffsetGenerator } from "@/core/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/core/pagination/adapters/implementations/TotalPagesGenerator";
import { DayjsDateProvider } from "@/domain/attendances/providers/implementations/DayJsProvider";
import { DeleteLunchStartAtUseCase } from "@/domain/attendances/use-cases/delete-lunch-start";
import { ListAttendanceUseCase } from "@/domain/attendances/use-cases/fetch-attendances";
import { RegisterFirstTimeInAttendanceUseCase } from "@/domain/attendances/use-cases/rfid-register-first-time";
import { RegisterLunchStartAttendanceUseCase } from "@/domain/attendances/use-cases/rfid-register-lunch-start";
import { RegisterClockedOutAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-clocked-out";
import { RegisterLunchEndAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-lunch-end";
import { DelayCalculationService } from "@/domain/services/delay-calculation-service";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { ExtraTimeCalculationService } from "@/domain/services/extra-time-calculation";
import { WorkTimeCalculationService } from "@/domain/services/work-time-calculation-service";
import { AttendancePrismaRepository } from "@/infra/database/repositories/prisma-attendance-repository";
import { EmployeePrismaRepository } from "@/infra/database/repositories/prisma-employee-repository";
import { JourneyPrismaRepository } from "@/infra/database/repositories/prisma-journey-repository";
import { EditFirstTimeUseCase } from "./../../../../domain/attendances/use-cases/edit-firts-time";
import { RegisterClockedInAttendanceController } from "./create-attendance-controller";
import { DeleteLunchStartController } from "./delete-lunch-start-controller";
import { EditFirstTimeController } from "./edit-first-time-controller";
import { ListAttendanceController } from "./fetch-attendances-controller";
import { RegisterClockedOutAttendanceController } from "./register-clocked-out-attendance-controller";
import { RegisterLunchEndAttendanceController } from "./register-lunch-end-attendance-controller";
import { RegisterLunchStartAttendanceController } from "./register-lunch-start-attendance-controller";
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const journeyRepository = new JourneyPrismaRepository();
const employeeRepository = new EmployeePrismaRepository();
const dayjsProvider = new DayjsDateProvider();
const calculaExtraTimeService = new ExtraTimeCalculationService(dayjsProvider);
const attendanceRepository = new AttendancePrismaRepository();
const calculateWorkTimeService = new WorkTimeCalculationService(dayjsProvider);
const delayCalculationService = new DelayCalculationService(dayjsProvider);
const entityFinderService = new EntityFinderService(
    attendanceRepository,
    employeeRepository,
    journeyRepository,
);

const deleteLunchStartUseCase = new DeleteLunchStartAtUseCase(
    attendanceRepository,
);

const deleteLunchStartController = new DeleteLunchStartController(
    deleteLunchStartUseCase,
);

const listAttendanceUseCase = new ListAttendanceUseCase(
    attendanceRepository,
    offsetGenerator,
    totalPagesGenerator,
);

const listAttendanceController = new ListAttendanceController(
    listAttendanceUseCase,
);

const registerFirstTimeInAttendanceUseCase =
    new RegisterFirstTimeInAttendanceUseCase(
        attendanceRepository,
        delayCalculationService,
        calculaExtraTimeService,
        dayjsProvider,
        calculateWorkTimeService,
        entityFinderService,
    );

const registerClockedInAttendanceController =
    new RegisterClockedInAttendanceController(
        registerFirstTimeInAttendanceUseCase,
    );

const editFirstTimeUseCase = new EditFirstTimeUseCase(
    attendanceRepository,
    entityFinderService,
    delayCalculationService,
    calculaExtraTimeService,
    calculateWorkTimeService,
);
const editFirstTimeController = new EditFirstTimeController(
    editFirstTimeUseCase,
);
const registerLunchStartAttendanceUseCase =
    new RegisterLunchStartAttendanceUseCase(
        attendanceRepository,
        delayCalculationService,
        calculateWorkTimeService,
        dayjsProvider,
        entityFinderService,
    );
const registerLunchStartAttendanceController =
    new RegisterLunchStartAttendanceController(
        registerLunchStartAttendanceUseCase,
    );

const registerLunchEndAttendanceUseCase = new RegisterLunchEndAttendanceUseCase(
    entityFinderService,
    delayCalculationService,
    calculateWorkTimeService,
    attendanceRepository,
);
const registerLunchEndAttendanceController =
    new RegisterLunchEndAttendanceController(registerLunchEndAttendanceUseCase);

const registerClockedOutAttendanceUseCase =
    new RegisterClockedOutAttendanceUseCase(
        entityFinderService,
        calculaExtraTimeService,
        calculateWorkTimeService,
        attendanceRepository,
    );

const registerClockedOutAttendanceController =
    new RegisterClockedOutAttendanceController(
        registerClockedOutAttendanceUseCase,
    );

export {
    deleteLunchStartController,
    editFirstTimeController,
    listAttendanceController,
    registerClockedInAttendanceController,
    registerClockedOutAttendanceController,
    registerLunchEndAttendanceController,
    registerLunchStartAttendanceController,
};

// Path: src/infra/http/routes/attendance-routes.ts

