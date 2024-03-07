import { Employee } from "@/domain/employee/entities/employee";

import {
    EmployeeRepository,
    IListEmployeesRequest,
    IListEmployeesResponse,
} from "@/domain/employee/repositories/employee-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaEmployeeMapper } from "../mappers/prisma-employee-mapper";

class EmployeePrismaRepository implements EmployeeRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }

    async findByRfid(rfid: string): Promise<Employee | null> {
        const employee = await this.prismaClient.employee.findFirst({
            where: {
                rfid,
            },
        });
        if (!employee) {
            return null;
        }

        return PrismaEmployeeMapper.toDomain(employee);
    }

    async findById(id: string): Promise<Employee | null> {
        const employeesP = await this.prismaClient.employee.findFirst({
            where: {
                id,
            },
        });
        if (!employeesP) {
            return null;
        }

        return PrismaEmployeeMapper.toDomain(employeesP);
    }

    async create(employee: Employee): Promise<void> {
        const data = PrismaEmployeeMapper.toPrisma(employee);

        await this.prismaClient.employee.create({ data });
    }

    async save(employee: Employee): Promise<void> {
        const data = PrismaEmployeeMapper.toPrisma(employee);

        await this.prismaClient.employee.update({
            where: {
                id: employee.id.toString(),
            },
            data,
        });
    }

    async delete(employee: Employee): Promise<void> {
        await this.prismaClient.employee.delete({
            where: {
                id: employee.id.toString(),
            },
        });
    }

    async list({
        search,
        limit,
        offset,
    }: IListEmployeesRequest): Promise<IListEmployeesResponse | null> {
        const where = search
            ? {
                  OR: [
                      {
                          name: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.employee.count({
            where,
        });

        const employeesP = await this.prismaClient.employee.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!employeesP) return null;

        const employees = await Promise.all(
            employeesP.map(async (employeeP) => {
                return PrismaEmployeeMapper.toDomain(employeeP);
            }),
        );

        return {
            employees,
            count,
        };
    }
}

export { EmployeePrismaRepository };

