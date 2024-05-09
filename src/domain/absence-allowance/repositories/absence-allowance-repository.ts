import { AbsenceAllowance } from "../entities/absence-allowance";

export interface IListAbsenceAllowancesResponse {
    absenceallowances: AbsenceAllowance[];
    count: number;
}

export interface IListAbsenceAllowancesRequest {
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

export abstract class AbsenceAllowanceRepository {
    abstract findById(id: string): Promise<AbsenceAllowance | null>;
    abstract findByEmployeeId(employeeId: string): Promise<AbsenceAllowance[] | null>;
    abstract list({
        search,
        limit,
        offset,
    }: IListAbsenceAllowancesRequest): Promise<IListAbsenceAllowancesResponse | null>;
    abstract save(absenceallowance: AbsenceAllowance): Promise<void>;
    abstract create(absenceallowance: AbsenceAllowance): Promise<void>;
    abstract delete(absenceallowance: AbsenceAllowance): Promise<void>;
}

