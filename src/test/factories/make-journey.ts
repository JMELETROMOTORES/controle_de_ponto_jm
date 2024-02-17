import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Journey, JourneyProps } from "@/domain/journey/entities/journey";

const allDayOfWeek = [
    {
        day: "Sunday",
        start_date: "00:00",
        end_date: "23:59",
    },
    {
        day: "Monday",
        start_date: "00:00",
        end_date: "23:59",
    },
    {
        day: "Tuesday",
        start_date: "00:00",
        end_date: "23:59",
    },
    {
        day: "Wednesday",
        start_date: "00:00",
        end_date: "23:59",
    },
    {
        day: "Thursday",
        start_date: "00:00",
        end_date: "23:59",
    },
    {
        day: "Friday",
        start_date: "00:00",
        end_date: "23:59",
    },
    {
        day: "Saturday",
        start_date: "00:00",
        end_date: "23:59",
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

