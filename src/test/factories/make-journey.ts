import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Journey, JourneyProps } from "@/domain/journey/entities/journey";

const allDayOfWeek = [
    {
        day: "Sunday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T18:00:00"),
    },
    {
        day: "Monday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T18:00:00"),
    },
    {
        day: "Tuesday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T18:00:00"),
    },
    {
        day: "Wednesday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T18:00:00"),
    },
    {
        day: "Thursday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T17:00:00"),
    },
    {
        day: "Friday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T18:00:00"),
    },
    {
        day: "Saturday",
        start_date: new Date("2021-10-10T08:00:00"),
        end_date: new Date("2021-10-10T18:00:00"),
    },
];

export function makeJourney(
    override: Partial<JourneyProps> = {},
    id?: UniqueEntityID,
) {
    const journey = Journey.create(
        {
            name: faker.commerce.productName(),
            dayOfWeek: allDayOfWeek,
            ...override,
        },
        id,
    );
    return journey;
}

