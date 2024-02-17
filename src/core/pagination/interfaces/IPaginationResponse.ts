export interface IPaginationResponse<T> {
    result: Array<T>;
    currentPage: number;
    totalPages: number;
    totalRegisters: number;
}
