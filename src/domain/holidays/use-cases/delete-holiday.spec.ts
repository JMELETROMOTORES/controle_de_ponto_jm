import { makeHoliday } from "@/test/factories/make-holiday";
import { InMemoryHolidayRepository } from "@/test/in-memory-holiday-repository";
import { DeleteHolidayUseCase } from "./delete-holiday";
let inMemoryHolidayRepository: InMemoryHolidayRepository;
let sut: DeleteHolidayUseCase; // Declare sut variable

describe("Delete holiday", () => {
    beforeEach(() => {
        inMemoryHolidayRepository = new InMemoryHolidayRepository();
        sut = new DeleteHolidayUseCase(inMemoryHolidayRepository);
    });

    it("should be able to delete a holiday", async () => {
        const newHoliday = makeHoliday();
        const newHoliday2 = makeHoliday();

        await inMemoryHolidayRepository.create(newHoliday);
        await inMemoryHolidayRepository.create(newHoliday2);

        await sut.execute(newHoliday.id.toString());
        expect(inMemoryHolidayRepository.items.length).toBe(1);
    });
});

