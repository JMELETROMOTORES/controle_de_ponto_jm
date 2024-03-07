import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Employee, EmployeeProps } from "@/domain/employee/entities/employee";

export function makeEmployee(
    override: Partial<EmployeeProps> = {},
    id?: UniqueEntityID,
) {
    const employee = Employee.create(
        {
            name: faker.person.fullName(),
            imgUrl: faker.image.avatar(),
            journeyId: new UniqueEntityID("1"),
            position: "Desenvolvedor",
            rfid: "123",
            ...override,
        },
        id,
    );

    return employee;
}

