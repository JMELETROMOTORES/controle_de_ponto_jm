import { makeAttendance } from "@/test/factories/make-attendance";
import { InMemoryAttendanceRepository } from "./../../../test/in-memory-attendance-repository";
import { DeleteRegisterUseCase } from "./delete-register";

let inMemoryAttendanceRepository: InMemoryAttendanceRepository;
let sut: DeleteRegisterUseCase;
describe("Delete register register", () => {
    beforeEach(() => {
        inMemoryAttendanceRepository = new InMemoryAttendanceRepository();
        sut = new DeleteRegisterUseCase(inMemoryAttendanceRepository);
    });

    it("should be able to delete a register", async () => {
        const newAttendance = makeAttendance();

        await inMemoryAttendanceRepository.create(newAttendance);

        await sut.execute(newAttendance.id.toString());

        expect(inMemoryAttendanceRepository.items[0]).toBeUndefined();
    });
});

