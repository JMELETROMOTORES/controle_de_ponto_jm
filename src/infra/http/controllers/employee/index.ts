import { OffsetGenerator } from "@/core/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/core/pagination/adapters/implementations/TotalPagesGenerator";
import { CreateEmployeeUseCase } from "@/domain/employee/use-cases/create-employee";
import { DeleteEmployeeUseCase } from "@/domain/employee/use-cases/delete-employee";
import { EditEmployeeUseCase } from "@/domain/employee/use-cases/edit-employee";
import { ListEmployeeUseCase } from "@/domain/employee/use-cases/fetch-employees";
import { GetEmployeeUseCase } from "@/domain/employee/use-cases/get-employee-by-id";
import { EmployeePrismaRepository } from "@/infra/database/repositories/prisma-employee-repository";
import { CreateEmployeeController } from "./create-employee-controller";
import { DeleteEmployeeController } from "./delete-employee-controller";
import { EditEmployeeController } from "./edit-employee-controller";
import { ListEmployeeController } from "./fetch-employee-controller";

import { GetEmployeeController } from "./get-employee-by-id-controller";
// all dependencies
const employeeRepository = new EmployeePrismaRepository();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();

// create Employee
const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository);
const createEmployeeController = new CreateEmployeeController(
    createEmployeeUseCase,
);

// delete employee

const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository);

const deleteEmployeeController = new DeleteEmployeeController(
    deleteEmployeeUseCase,
);

// fetch all employees
const listEmployeeUseCase = new ListEmployeeUseCase(
    employeeRepository,
    offsetGenerator,
    totalPagesGenerator,
);

// fetch employee by id

const getEmployeeUseCase = new GetEmployeeUseCase(employeeRepository);

const getEmployeeController = new GetEmployeeController(getEmployeeUseCase);

// edit employee
const editEmployeeUseCase = new EditEmployeeUseCase(employeeRepository);
const editEmployeeController = new EditEmployeeController(editEmployeeUseCase);

const listEmployeeController = new ListEmployeeController(listEmployeeUseCase);

export {
    createEmployeeController,
    deleteEmployeeController,
    editEmployeeController,
    getEmployeeController,
    listEmployeeController,
};

