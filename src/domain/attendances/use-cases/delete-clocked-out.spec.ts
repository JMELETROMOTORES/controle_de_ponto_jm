import { makeAttendance } from "@/test/factories/make-attendance";
import { InMemoryAttendanceRepository } from "./../../../test/in-memory-attendance-repository";
import { DeleteClockedOutUseCase } from "./delete-clocked-out";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: DeleteClockedOutUseCase;
describe("Delete clockedOut register", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new DeleteClockedOutUseCase(inMemoryAttendanceRepository);
    });

    it("should be able to delete a clockedOut", async () => {
        const newAttendance = makeAttendance();

        await inMemoryAttendanceRepository.create(newAttendance);

        await sut.execute(newAttendance.id.toString());
        console.log(inMemoryAttendanceRepository.items[0]);
        expect(
            inMemoryAttendanceRepository.items[0].clockedOut,
        ).toBeNull();
    });
});

