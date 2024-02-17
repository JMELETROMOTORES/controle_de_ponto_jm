import { Journey } from "@/domain/journey/entities/journey";
import {
    IListJourneysRequest,
    IListJourneysResponse,
    JourneyRepository,
} from "@/domain/journey/repositories/journey-repository";

export class InMemoryJourneyRepository implements JourneyRepository {
    public items: Journey[] = [];

    async findById(id: string): Promise<Journey | null> {
        const journey = this.items.find(
            (journey) => journey.id.toString() === id,
        );

        return journey || null;
    }

    async save(journey: Journey): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(journey.id));

        this.items[index] = journey;
    }

    async create(journey: Journey): Promise<void> {
        this.items.push(journey);
    }

    async delete(journey: Journey): Promise<void> {
        this.items = this.items.filter((p) => !p.id.equals(journey.id));
    }

    async list({
        search,
        limit,
        offset,
    }: IListJourneysRequest): Promise<IListJourneysResponse> {
        let filteredJourneys = this.items;

        if (search) {
            filteredJourneys = this.items.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        const startIndex = offset || 0;
        const endIndex = startIndex + (limit || this.items.length);
        const paginatedJourneys = filteredJourneys.slice(startIndex, endIndex);
        return {
            journeys: paginatedJourneys,
            count: this.items.length,
        };
    }
}

