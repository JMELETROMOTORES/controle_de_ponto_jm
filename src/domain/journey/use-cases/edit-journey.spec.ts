import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeJourney } from "@/test/factories/make-journey";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { EditJourneyUseCase } from "./edit-journey";

let inMemoryJourneysRepository: InMemoryJourneyRepository;

let sut: EditJourneyUseCase;

describe("Edit Journey", () => {
    beforeEach(() => {
        inMemoryJourneysRepository = new InMemoryJourneyRepository();
        sut = new EditJourneyUseCase(inMemoryJourneysRepository);
    });

    it("should be able to edit a journey", async () => {
        const newJourney = makeJourney(
            {
                name: "Journey 1",
                start_date: "08:00",
                end_date: "18:00",
                lunch_time_tolerance: 60,
            },
            new UniqueEntityID("1"),
        );

        await inMemoryJourneysRepository.create(newJourney);

        const result = await sut.execute({
            id: newJourney.id.toString(),
            name: "Journey 2",
            start_date: "08:00",
            end_date: "17:00",
            lunch_time_tolerance: 60,
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryJourneysRepository.items[0].name).toBe("Journey 2");
        expect(inMemoryJourneysRepository.items[0].end_date).toBe("17:00");
    });
});

