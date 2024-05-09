import { Holiday } from "../entities/holiday";

export interface IListHolidaysResponse {
    holidays: Holiday[];
    count: number;
}

export interface IListHolidaysRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

export interface IListUseCaseParams {
    search?: string;
    limit?: number;
    page?: number;
    orderBy?: string;
    orderMode?: string;
}

export abstract class HolidayRepository {
    abstract findById(id: string): Promise<Holiday | null>;
    abstract list({
        search,
        limit,
        offset,
    }: IListHolidaysRequest): Promise<IListHolidaysResponse | null>;
    abstract findHolidaysBetween(start: Date, end: Date): Promise<Holiday[]>;
    abstract save(holiday: Holiday): Promise<void>;
    abstract create(holiday: Holiday): Promise<void>;   
    abstract delete(holiday: Holiday): Promise<void>;

}

