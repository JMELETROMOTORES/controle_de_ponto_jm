import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AbsenceAllowance, AbsenceAllowanceProps } from "@/domain/absence-allowance/entities/absence-allowance";

export function makeAbsenceAllowance(
    override: Partial<AbsenceAllowanceProps> = {},
    id?: UniqueEntityID,
) {
    const absenceallowance = AbsenceAllowance.create(
        {
            employeeId: new UniqueEntityID("1").toString(),
            reason: faker.person.fullName(),
            date: new Date(),
            ...override,
        },
        id,
    );

    return absenceallowance;
}

