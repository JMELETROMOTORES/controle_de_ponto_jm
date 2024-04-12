import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Holiday, HolidayProps } from "@/domain/holidays/entities/holiday";



export function makeHoliday(
    override: Partial<HolidayProps> = {},
    id?: UniqueEntityID,
) {
    const holiday = Holiday.create(
        {
            reason: "Ano Novo",
            date: new Date(),
            ...override,
        },
        id,
    );
    return holiday;
}


