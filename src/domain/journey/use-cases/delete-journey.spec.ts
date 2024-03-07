import { makeJourney } from "@/test/factories/make-journey";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { DeleteJourneyUseCase } from "./delete-journey";
let inMemoryJourneyRepository: InMemoryJourneyRepository;
let sut: DeleteJourneyUseCase; // Declare sut variable

describe("Delete journey", () => {
    beforeEach(() => {
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        sut = new DeleteJourneyUseCase(inMemoryJourneyRepository);
    });

    it("should be able to delete a journey", async () => {
        const newJourney = makeJourney();
        const newJourney2 = makeJourney();

        await inMemoryJourneyRepository.create(newJourney);
        await inMemoryJourneyRepository.create(newJourney2);

        await sut.execute(newJourney.id.toString());
        expect(inMemoryJourneyRepository.items.length).toBe(1);
    });
});

