import { makeAttendance } from "@/test/factories/make-attendance";
import { InMemoryAttendanceRepository } from "./../../../test/in-memory-attendance-repository";
import { DeleteLunchStartAtUseCase } from "./delete-lunch-start";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: DeleteLunchStartAtUseCase;
describe("Delete lunch start register", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new DeleteLunchStartAtUseCase(inMemoryAttendanceRepository);
    });

    it("should be able to delete a lunch start", async () => {
        const newAttendance = makeAttendance();

        await inMemoryAttendanceRepository.create(newAttendance);

        await sut.execute(newAttendance.id.toString());
        expect(
            inMemoryAttendanceRepository.items[0].lunchStart,
        ).toBeUndefined();
    });
});

