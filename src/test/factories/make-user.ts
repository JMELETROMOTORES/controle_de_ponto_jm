import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUserProps, User } from "@/domain/users/entities/User";

export function makeUser(
    override: Partial<IUserProps> = {},
    id?: UniqueEntityID,
) {
    const user = User.create(
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            ...override,
        },
        id,
    );

    return user;
}
