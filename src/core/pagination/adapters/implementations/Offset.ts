import { IOffsetGenerator, IOffsetGeneratorParams } from "../IOffset";

export class OffsetGenerator implements IOffsetGenerator {
    generate({ page, limit }: IOffsetGeneratorParams): number {
        return (page ?? 0) * (limit ?? 1);
    }
}
