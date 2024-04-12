import { Holiday } from "@/domain/holidays/entities/holiday";
import { HolidayRepository, IListHolidaysRequest, IListHolidaysResponse } from "@/domain/holidays/repositories/holiday-repository";


export class InMemoryHolidayRepository implements HolidayRepository {
    public items: Holiday[] = [];

    async findById(id: string): Promise<Holiday | null> {
        const holiday = this.items.find(
            (holiday) => holiday.id.toString() === id,
        );

        return holiday || null;
    }


    async findHolidaysBetween(start: Date, end: Date): Promise<Holiday[]> {
        return this.items.filter((holiday) => {
            return holiday.date >= start && holiday.date <= end;
        });
    }

    async save(holiday: Holiday): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(holiday.id));

        this.items[index] = holiday;
    }

    async create(holiday: Holiday): Promise<void> {
        this.items.push(holiday);
    }

    async delete(holiday: Holiday): Promise<void> {
        this.items = this.items.filter((p) => !p.id.equals(holiday.id));
    }

    async list({
        search,
        limit,
        offset,
    }: IListHolidaysRequest): Promise<IListHolidaysResponse> {
        let filteredHolidays = this.items;

        if (search) {
            filteredHolidays = this.items.filter((user) =>
                user.reason.toLowerCase().includes(search.toLowerCase()),
            );
        }

        const startIndex = offset || 0;
        const endIndex = startIndex + (limit || this.items.length);
        const paginatedHolidays = filteredHolidays.slice(startIndex, endIndex);
        return {
            holidays: paginatedHolidays,
            count: this.items.length,
        };
    }
}

