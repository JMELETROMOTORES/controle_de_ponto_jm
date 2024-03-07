import { InMemoryJourneyRepository } from "@/test/in-memory-journey-repository";

import { makeJourney } from "@/test/factories/make-journey";
import { ListJourneyUseCase } from "./fetch-journey";

let inMemoryJourneyRepository: InMemoryJourneyRepository;
let sut: ListJourneyUseCase;

describe("List Journeys Use Case", () => {
    beforeEach(() => {
        inMemoryJourneyRepository = new InMemoryJourneyRepository();
        sut = new ListJourneyUseCase(
            inMemoryJourneyRepository,
            { generate: jest.fn(() => 0) },
            { generate: jest.fn(() => 1) },
        );
    });

    it("should return a list of journeys", async () => {
        const journey1 = makeJourney();
        const journey2 = makeJourney();
        const journey3 = makeJourney();
        const journey4 = makeJourney();
        const journey5 = makeJourney();

        await inMemoryJourneyRepository.create(journey1);
        await inMemoryJourneyRepository.create(journey2);
        await inMemoryJourneyRepository.create(journey3);
        await inMemoryJourneyRepository.create(journey4);
        await inMemoryJourneyRepository.create(journey5);

        const response = await sut.execute({ search: "", limit: 2, page: 4 });

        expect(response.isRight()).toBeTruthy();
        expect(response.value).toHaveProperty("result");
        expect(response.value).toHaveProperty("totalRegisters");
        expect(response.value).toHaveProperty("totalPages");
        expect(response.value).toHaveProperty("currentPage");
    });
});

