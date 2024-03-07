import { OffsetGenerator } from "@/core/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/core/pagination/adapters/implementations/TotalPagesGenerator";
import { DayjsDateProvider } from "@/domain/attendances/providers/implementations/DayJsProvider";
import { EditAttendanceUseCase } from "@/domain/attendances/use-cases/edit-attendance";
import { ListAttendanceUseCase } from "@/domain/attendances/use-cases/fetch-attendances";
import { RegisterFirstTimeInAttendanceUseCase } from "@/domain/attendances/use-cases/rfid-register-first-time";
import { RegisterLunchStartAttendanceUseCase } from "@/domain/attendances/use-cases/rfid-register-lunch-start";
import { RegisterClockedOutAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-clocked-out";
import { RegisterLunchEndAttendanceUseCase } from "@/domain/attendances/use-cases/rifd-register-lunch-end";
import { AttendancePrismaRepository } from "@/infra/database/repositories/prisma-attendance-repository";
import { EmployeePrismaRepository } from "@/infra/database/repositories/prisma-employee-repository";
import { JourneyPrismaRepository } from "@/infra/database/repositories/prisma-journey-repository";
import { RegisterClockedInAttendanceController } from "./create-attendance-controller";
import { EditAttendanceController } from "./edit-attendance-controller";
import { ListAttendanceController } from "./fetch-attendances-controller";
import { RegisterClockedOutAttendanceController } from "./register-clocked-out-attendance-controller";
import { RegisterLunchEndAttendanceController } from "./register-lunch-end-attendance-controller";
import { RegisterLunchStartAttendanceController } from "./register-lunch-start-attendance-controller";
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const journeyRepository = new JourneyPrismaRepository();
const employeeRepository = new EmployeePrismaRepository();
const dayjsProvider = new DayjsDateProvider();
const attendanceRepository = new AttendancePrismaRepository();

const listAttendanceUseCase = new ListAttendanceUseCase(
    attendanceRepository,
    offsetGenerator,
    totalPagesGenerator,
);

const listAttendanceController = new ListAttendanceController(
    listAttendanceUseCase,
);

const editAttendanceUseCase = new EditAttendanceUseCase(attendanceRepository);

const editAttendanceController = new EditAttendanceController(
    editAttendanceUseCase,
);
const registerFirstTimeInAttendanceUseCase =
    new RegisterFirstTimeInAttendanceUseCase(
        attendanceRepository,
        dayjsProvider,
        employeeRepository,
        journeyRepository,
    );

const registerClockedInAttendanceController =
    new RegisterClockedInAttendanceController(
        registerFirstTimeInAttendanceUseCase,
    );

const registerLunchStartAttendanceUseCase =
    new RegisterLunchStartAttendanceUseCase(
        attendanceRepository,
        employeeRepository,
    );
const registerLunchStartAttendanceController =
    new RegisterLunchStartAttendanceController(
        registerLunchStartAttendanceUseCase,
    );

const registerLunchEndAttendanceUseCase = new RegisterLunchEndAttendanceUseCase(
    attendanceRepository,
    dayjsProvider,
    employeeRepository,
    journeyRepository,
);
const registerLunchEndAttendanceController =
    new RegisterLunchEndAttendanceController(registerLunchEndAttendanceUseCase);

const registerClockedOutAttendanceUseCase =
    new RegisterClockedOutAttendanceUseCase(
        attendanceRepository,
        journeyRepository,
        employeeRepository,
        dayjsProvider,
    );

const registerClockedOutAttendanceController =
    new RegisterClockedOutAttendanceController(
        registerClockedOutAttendanceUseCase,
    );

export {
    editAttendanceController,
    listAttendanceController,
    registerClockedInAttendanceController,
    registerClockedOutAttendanceController,
    registerLunchEndAttendanceController,
    registerLunchStartAttendanceController,
};

// Path: src/infra/http/routes/attendance-routes.ts

