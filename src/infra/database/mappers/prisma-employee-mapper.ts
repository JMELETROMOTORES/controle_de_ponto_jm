import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Employee } from "@/domain/employee/entities/employee";
import { Prisma, Employee as PrismaEmployee } from "@prisma/client";

export class PrismaEmployeeMapper {
    static toDomain(raw: PrismaEmployee): Employee {
        return Employee.create(
            {
                name: raw.name,
                imgUrl: raw.imgUrl,
                position: raw.position,
                rfid: raw.rfid,
                journeyId: new UniqueEntityID(raw.journeyId),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.id),
        );
    }

    static toPrisma(employee: Employee): Prisma.EmployeeUncheckedCreateInput {
        return {
            id: employee.id.toString(),
            name: employee.name,
            imgUrl: employee.imgUrl,
            position: employee.position,
            rfid: employee.rfid,
            journeyId: employee.journeyId.toString(),
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
        };
    }
}

