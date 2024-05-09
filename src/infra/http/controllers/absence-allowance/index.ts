import { CreateAbsenceAllowanceController } from "./create-absence-allowance-controller";
import { CreateAbsenceAllowanceUseCase } from "@/domain/absence-allowance/use-cases/create-absence-allowance";
import { AbsenceAllowancePrismaRepository } from "@/infra/database/repositories/prisma-absence-allowance-repository";
import { EmployeePrismaRepository } from "@/infra/database/repositories/prisma-employee-repository";

const employeeRepository = new EmployeePrismaRepository();
const absenceAllowanceRepository = new AbsenceAllowancePrismaRepository();

const createAbsenceAllowanceUseCase = new CreateAbsenceAllowanceUseCase(absenceAllowanceRepository,employeeRepository);

const createAbsenceAllowanceController = new CreateAbsenceAllowanceController(createAbsenceAllowanceUseCase);


export {
    createAbsenceAllowanceController
};