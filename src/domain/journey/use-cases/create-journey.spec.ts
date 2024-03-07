import { makeJourney } from "@/test/factories/make-journey";
import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";
import { CreateJourneyUseCase } from "./create-journey";

let inMemoryJourneyRepository: InMemoryJourneyRepository;
let sut: CreateJourneyUseCase;

describe("Create Journey Use Case", () => {
    beforeEach(() => {
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        sut = new CreateJourneyUseCase(inMemoryJourneyRepository);
    });

    it("should be able to create a new journey", async () => {
        const newJourney = makeJourney();

        const response = await sut.execute(newJourney);

        expect(response.isRight()).toBeTruthy();
        expect(inMemoryJourneyRepository.items.length).toBe(1);
    });
});

