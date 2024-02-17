import { IPaginationResponse } from "../pagination/interfaces/IPaginationResponse";

export interface IListUseCaseParams {
    search?: string;
    limit?: number;
    page?: number;
    orderBy?: string;
    orderMode?: string;
}

export interface IListPaginatedUseCase<T_Entity> {
    execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<T_Entity>>;
}

export interface IListUseCase<T_Entity> {
    execute({ search, limit, page }: IListUseCaseParams): Promise<T_Entity[]>;
}
