import { makeAttendance } from "@/test/factories/make-attendance";
import { InMemoryAttendanceRepository } from "./../../../test/in-memory-attendance-repository";
import { DeleteLunchEndAtUseCase } from "./delete-lunch-end";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: DeleteLunchEndAtUseCase;
describe("Delete lunch end register", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new DeleteLunchEndAtUseCase(inMemoryAttendanceRepository);
    });

    it("should be able to delete a lunch end", async () => {
        const newAttendance = makeAttendance();

        await inMemoryAttendanceRepository.create(newAttendance);

        await sut.execute(newAttendance.id.toString());

        expect(inMemoryAttendanceRepository.items[0].lunchEnd).toBeNull();
    });
});

