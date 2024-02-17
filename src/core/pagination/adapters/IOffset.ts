export interface IOffsetGeneratorParams {
    page?: number;
    limit?: number;
}

export interface IOffsetGenerator {
    generate({ page, limit }: IOffsetGeneratorParams): number;
}
