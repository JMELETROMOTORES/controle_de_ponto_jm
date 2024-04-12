import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeHoliday } from "@/test/factories/make-holiday";
import { InMemoryHolidayRepository } from "@/test/in-memory-holiday-repository";
import { EditHolidayUseCase } from "./edit-holiday";

let inMemoryHolidaysRepository: InMemoryHolidayRepository;

let sut: EditHolidayUseCase;

describe("Edit Holiday", () => {
    beforeEach(() => {
        inMemoryHolidaysRepository = new InMemoryHolidayRepository();
        sut = new EditHolidayUseCase(inMemoryHolidaysRepository);
    });

    it("should be able to edit a holiday", async () => {
        const newHoliday = makeHoliday(
            {
                reason: "Holiday 1",
                date: new Date(),
            
            },
            new UniqueEntityID("1"),
        );

        await inMemoryHolidaysRepository.create(newHoliday);

        const result = await sut.execute({
            id: newHoliday.id.toString(),
            reason: "Holiday 2",
            date: new Date(),

        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryHolidaysRepository.items[0].reason).toBe("Holiday 2");
        
    });
});

