export interface ITotalPagesGeneratorParams {
    totalRegisters: number;
    limit?: number;
}

export interface ITotalPagesGenerator {
    generate({ totalRegisters, limit }: ITotalPagesGeneratorParams): number;
}
