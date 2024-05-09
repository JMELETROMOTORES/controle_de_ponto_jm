import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAbsenceAllowanceRepository } from "@/test/in-memory-absence-allowance-repository";
import { GetAbsenceAllowanceUseCase } from "./get-absence-allowance-by-employee-id";
import { makeEmployee } from "@/test/factories/make-employee";
import { makeAbsenceAllowance } from "@/test/factories/make-absence-allowance";

let inMemoryAbsenceAllowanceRepository: InMemoryAbsenceAllowanceRepository;
let sut: GetAbsenceAllowanceUseCase;

describe("List AbsenceAllowances Use Case", () => {
    beforeEach(() => {
        inMemoryAbsenceAllowanceRepository = new InMemoryAbsenceAllowanceRepository();
        sut = new GetAbsenceAllowanceUseCase(inMemoryAbsenceAllowanceRepository);
    });

    it("should get absenceallowance with id", async () => {
        
        const absenceallowance = makeAbsenceAllowance({}, new UniqueEntityID("1"));

        await inMemoryAbsenceAllowanceRepository.create(absenceallowance);
        await inMemoryAbsenceAllowanceRepository.create(absenceallowance);
        await inMemoryAbsenceAllowanceRepository.create(absenceallowance);
        await inMemoryAbsenceAllowanceRepository.create(absenceallowance);
        const result = await sut.execute({ EmployeeId: "1" });
        expect(result.isRight()).toBe(true);
    });
});

