import { User } from "../entities/User";

export interface IListUsersResponse {
    users: User[];
    count: number;
}

export interface IListUsersRequest {
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

export abstract class UserRepository {
    abstract findByMail(email: string): Promise<User | null>;
    abstract create(user: User): Promise<void>;
    abstract list({
        search,
        limit,
        offset,
    }: IListUsersRequest): Promise<IListUsersResponse | null>;
}

