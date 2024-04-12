import { makeHoliday } from "@/test/factories/make-holiday";
import { InMemoryHolidayRepository } from "@/test/in-memory-holiday-repository";
import { CreateHolidayUseCase } from "./create-holiday";

let inMemoryHolidayRepository: InMemoryHolidayRepository;
let sut: CreateHolidayUseCase;

describe("Create Holiday Use Case", () => {
    beforeEach(() => {
        inMemoryHolidayRepository = new InMemoryHolidayRepository();
        sut = new CreateHolidayUseCase(inMemoryHolidayRepository);
    });

    it("should be able to create a new holiday", async () => {
        const newHoliday = makeHoliday();

        const response = await sut.execute(newHoliday);

        expect(response.isRight()).toBeTruthy();
        expect(inMemoryHolidayRepository.items.length).toBe(1);
    });
});

