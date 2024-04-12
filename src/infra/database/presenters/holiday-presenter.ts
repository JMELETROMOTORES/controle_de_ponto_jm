import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface IHolidayPresenter {
    id: UniqueEntityID;
    reason: string;
    date: Date;
  
}

export class HolidayPresenter {
    static toHTTP(holiday: IHolidayPresenter) {
        return {
            id: holiday.id.toString(),
            reason: holiday.reason,
            date: holiday.date,
        };
    }
}

