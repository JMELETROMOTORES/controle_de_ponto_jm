import { ClockedIn } from "@/domain/attendances/entities/clockedInAt";
import { ClockedInRepository } from "@/domain/attendances/repositories/clocked-in-at-repository";

export class InMemoryClockedInRepository implements ClockedInRepository {
    delete(clockedin: ClockedIn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public items: ClockedIn[] = [];

    async save(clockedin: ClockedIn): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(clockedin.id));

        this.items[index] = clockedin;
    }

    async create(clockedin: ClockedIn): Promise<void> {
        this.items.push(clockedin);
    }
}

