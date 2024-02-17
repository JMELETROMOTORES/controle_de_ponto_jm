import { Employee } from "../entities/employee";

export interface IListEmployeesResponse {
    employees: Employee[];
    count: number;
}

export interface IListEmployeesRequest {
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

export abstract class EmployeeRepository {
    abstract findById(id: string): Promise<Employee | null>;
    abstract findByRfid(rfid: string): Promise<Employee | null>;
    abstract list({
        search,
        limit,
        offset,
    }: IListEmployeesRequest): Promise<IListEmployeesResponse | null>;
    abstract save(employee: Employee): Promise<void>;
    abstract create(employee: Employee): Promise<void>;
    abstract delete(employee: Employee): Promise<void>;
}

