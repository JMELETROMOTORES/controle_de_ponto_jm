import { makeEmployee } from "@/test/factories/make-employee";
import { InMemoryAbsenceAllowanceRepository } from "@/test/in-memory-absence-allowance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { CreateAbsenceAllowanceUseCase } from "./create-absence-allowance";
import { DeleteAbsenceAllowanceUseCase } from "./delete-absence-allowance";
import { makeAbsenceAllowance } from "@/test/factories/make-absence-allowance";
let inMemoryAbsenceAllowanceRepository: InMemoryAbsenceAllowanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: DeleteAbsenceAllowanceUseCase;


describe("Delete Absence Allowance", () => {
    beforeEach(() => {
        inMemoryAbsenceAllowanceRepository = new InMemoryAbsenceAllowanceRepository();
        sut = new DeleteAbsenceAllowanceUseCase(inMemoryAbsenceAllowanceRepository);
    });


    it("should be able to delete a absence Allowance", async () => {
        const newAbsenceAllowance = makeAbsenceAllowance()
        const newAbsenceAllowance2 = makeAbsenceAllowance()

        await inMemoryAbsenceAllowanceRepository.create(newAbsenceAllowance);
        await inMemoryAbsenceAllowanceRepository.create(newAbsenceAllowance2);

        await sut.execute(newAbsenceAllowance.id.toString());
        expect(inMemoryAbsenceAllowanceRepository.items.length).toBe(1);
    });
});

