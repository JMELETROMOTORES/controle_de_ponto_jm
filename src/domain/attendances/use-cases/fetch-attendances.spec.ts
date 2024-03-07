import { InMemoryAttendanceRepository } from "@/test/in-memory-attendance-repository";

import { makeAttendance } from "@/test/factories/make-attendance";
import { ListAttendanceUseCase } from "./fetch-attendances";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: ListAttendanceUseCase;

describe("List Attendances Use Case", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new ListAttendanceUseCase(
            inMemoryAttendanceRepository,
            { generate: jest.fn(() => 0) },
            { generate: jest.fn(() => 1) },
        );
    });

    it("should return a list of attendances", async () => {
        const attendance1 = makeAttendance();
        const attendance2 = makeAttendance();
        const attendance3 = makeAttendance();
        const attendance4 = makeAttendance();
        const attendance5 = makeAttendance();

        await inMemoryAttendanceRepository.create(attendance1);
        await inMemoryAttendanceRepository.create(attendance2);
        await inMemoryAttendanceRepository.create(attendance3);
        await inMemoryAttendanceRepository.create(attendance4);
        await inMemoryAttendanceRepository.create(attendance5);

        const response = await sut.execute({ search: "", limit: 2, page: 4 });

        expect(response.isRight()).toBeTruthy();
        expect(response.value).toHaveProperty("result");
        expect(response.value).toHaveProperty("totalRegisters");
        expect(response.value).toHaveProperty("totalPages");
        expect(response.value).toHaveProperty("currentPage");
    });
});

