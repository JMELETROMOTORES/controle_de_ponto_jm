import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { CreateAbsenceAllowanceUseCase } from "./create-absence-allowance";
import { InMemoryAbsenceAllowanceRepository } from "@/test/in-memory-absence-allowance-repository";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { makeEmployee } from "@/test/factories/make-employee";

let inMemoryAbsenceAllowanceRepository: InMemoryAbsenceAllowanceRepository;
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: CreateAbsenceAllowanceUseCase;

describe("Create AbsenceAllowance Use Case", () => {
    beforeEach(() => {
        inMemoryAbsenceAllowanceRepository = new InMemoryAbsenceAllowanceRepository();
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new CreateAbsenceAllowanceUseCase(inMemoryAbsenceAllowanceRepository,inMemoryEmployeeRepository);
    });

    it("should be able to create a new absenceallowance", async () => {
        const newEmployee = makeEmployee(
            {
                name: "Employee 1",
                position: "Developer",
                imgUrl: "image.png",
                rfid: "123456",
                journeyId: new UniqueEntityID("1"),
            },
            new UniqueEntityID("1"),
        );

        await inMemoryEmployeeRepository.create(newEmployee);

        const absenceallowanceData1 = {
            employeeId: newEmployee.id.toString(),
            reason: "AbsenceAllowance Name",
            date: "2021-09-01"
        };

        const result = await sut.execute(absenceallowanceData1);
        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            absenceallowance: inMemoryAbsenceAllowanceRepository.items[0],
        });
    });



});
