import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";

import { makeEmployee } from "@/test/factories/make-employee";
import { ListEmployeeUseCase } from "./fetch-employees";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: ListEmployeeUseCase;

describe("List Employees Use Case", () => {
    beforeEach(() => {
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new ListEmployeeUseCase(
            inMemoryEmployeeRepository,
            { generate: jest.fn(() => 0) },
            { generate: jest.fn(() => 1) },
        );
    });

    it("should return a list of employees", async () => {
        const employee1 = makeEmployee();
        const employee2 = makeEmployee();
        const employee3 = makeEmployee();
        const employee4 = makeEmployee();
        const employee5 = makeEmployee();

        await inMemoryEmployeeRepository.create(employee1);
        await inMemoryEmployeeRepository.create(employee2);
        await inMemoryEmployeeRepository.create(employee3);
        await inMemoryEmployeeRepository.create(employee4);
        await inMemoryEmployeeRepository.create(employee5);

        const response = await sut.execute({ search: "", limit: 2, page: 4 });

        expect(response.isRight()).toBeTruthy();
        expect(response.value).toHaveProperty("result");
        expect(response.value).toHaveProperty("totalRegisters");
        expect(response.value).toHaveProperty("totalPages");
        expect(response.value).toHaveProperty("currentPage");
    });
});

