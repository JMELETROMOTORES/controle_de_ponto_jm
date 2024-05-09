import { makeEmployee } from "@/test/factories/make-employee";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { DeleteEmployeeUseCase } from "./delete-employee";
let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: DeleteEmployeeUseCase; // Declare sut variable

describe("Delete employee", () => {
    beforeEach(() => {
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new DeleteEmployeeUseCase(inMemoryEmployeeRepository);
    });

    it("should be able to delete a employee", async () => {
        const newEmployee = makeEmployee();
        const newEmployee2 = makeEmployee();

        await inMemoryEmployeeRepository.create(newEmployee);
        await inMemoryEmployeeRepository.create(newEmployee2);

        await sut.execute(newEmployee.id.toString());
        expect(inMemoryEmployeeRepository.items.length).toBe(1);
    });
});

