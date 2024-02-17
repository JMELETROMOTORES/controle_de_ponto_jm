export interface ICurrentPageValidationParams {
    totalPages: number;
    currentPage?: number;
}

export interface ICurrentPageValidation {
    validate({
        currentPage,
        totalPages,
    }: ICurrentPageValidationParams): boolean;
}
