import { Attendance } from "../entities/attendances";
import { AttendancesEmployees } from "../entities/value-objects/attendances-with-employees";

export interface IListAttendancesResponse {
    attendances: AttendancesEmployees[];
    count: number;
}

export interface IListAttendancesRequest {
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

export abstract class AttendanceRepository {
    abstract findById(id: string): Promise<Attendance | null>;
    abstract findByEmployeeId(employeeId: string): Promise<AttendancesEmployees[] | null>;
    abstract findByDateAndRfid(date: Date, rfid: string): Promise<Attendance | null>;
    abstract generateReport(rfid: string, startDate: Date, endDate: Date): Promise<Attendance[] | null>;
    abstract findByRfid(rfid: string): Promise<Attendance| null>;
    abstract list({
        search,
        limit,
        offset,
    }: IListAttendancesRequest): Promise<IListAttendancesResponse | null>;
    abstract save(attendance: Attendance): Promise<void>;
    abstract create(attendance: Attendance): Promise<void>;
    abstract delete(attendance: Attendance): Promise<void>;
}

