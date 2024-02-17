import {
    ITotalPagesGenerator,
    ITotalPagesGeneratorParams,
} from "../ITotalPagesGenerator";

export class TotalPagesGenerator implements ITotalPagesGenerator {
    generate({ totalRegisters, limit }: ITotalPagesGeneratorParams): number {
        return Math.ceil(totalRegisters / (limit ?? totalRegisters));
    }
}
