import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeEmployee } from "@/test/factories/make-employee";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { GetEmployeeUseCase } from "./get-employee-by-id";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: GetEmployeeUseCase;

describe("List Employees Use Case", () => {
    beforeEach(() => {
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new GetEmployeeUseCase(inMemoryEmployeeRepository);
    });

    it("should get employee with id", async () => {
        const employee = makeEmployee({}, new UniqueEntityID("1"));
        await inMemoryEmployeeRepository.create(employee);

        const result = await sut.execute({ id: "1" });

        expect(result.isRight()).toBe(true);
    });
});

