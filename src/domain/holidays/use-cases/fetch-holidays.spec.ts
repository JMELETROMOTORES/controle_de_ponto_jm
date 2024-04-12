import { InMemoryHolidayRepository } from "@/test/in-memory-holiday-repository";

import { makeHoliday } from "@/test/factories/make-holiday";
import { ListHolidayUseCase } from "./fetch-holidays";

let inMemoryHolidayRepository: InMemoryHolidayRepository;
let sut: ListHolidayUseCase;

describe("List Holidays Use Case", () => {
    beforeEach(() => {
        inMemoryHolidayRepository = new InMemoryHolidayRepository();
        sut = new ListHolidayUseCase(
            inMemoryHolidayRepository,
            { generate: jest.fn(() => 0) },
            { generate: jest.fn(() => 1) },
        );
    });

    it("should return a list of holidays", async () => {
        const holiday1 = makeHoliday();
        const holiday2 = makeHoliday();
        const holiday3 = makeHoliday();
        const holiday4 = makeHoliday();
        const holiday5 = makeHoliday();

        await inMemoryHolidayRepository.create(holiday1);
        await inMemoryHolidayRepository.create(holiday2);
        await inMemoryHolidayRepository.create(holiday3);
        await inMemoryHolidayRepository.create(holiday4);
        await inMemoryHolidayRepository.create(holiday5);

        const response = await sut.execute({ search: "", limit: 2, page: 4 });

        expect(response.isRight()).toBeTruthy();
        expect(response.value).toHaveProperty("result");
        expect(response.value).toHaveProperty("totalRegisters");
        expect(response.value).toHaveProperty("totalPages");
        expect(response.value).toHaveProperty("currentPage");
    });
});

