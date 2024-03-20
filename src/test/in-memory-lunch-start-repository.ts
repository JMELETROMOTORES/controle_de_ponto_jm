import { LunchStart } from "@/domain/attendances/entities/lunchStartAt";
import { LunchStartRepository } from "@/domain/attendances/repositories/lunch-start-repository";

export class InMemoryLunchStartRepository implements LunchStartRepository {
    delete(lunchstart: LunchStart): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public items: LunchStart[] = [];

    async save(lunchstart: LunchStart): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(lunchstart.id));

        this.items[index] = lunchstart;
    }

    async registerLunchStart(lunchstart: LunchStart): Promise<void> {
        this.items.push(lunchstart);
    }
}

