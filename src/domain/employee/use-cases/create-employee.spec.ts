import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { CreateEmployeeUseCase } from "./create-employee";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: CreateEmployeeUseCase;

describe("Create Employee Use Case", () => {
    beforeEach(() => {
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new CreateEmployeeUseCase(inMemoryEmployeeRepository);
    });

    it("should be able to create a new employee", async () => {
        const employeeData = {
            name: "Employee Name",
            imgUrl: "Employee Image",
            position: "Employee Position",
            access_code: "Employee Access Code",
            journeyId: new UniqueEntityID("1"),
        };

        const result = await sut.execute(employeeData);

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            employee: inMemoryEmployeeRepository.items[0],
        });
        const createdEmployee = inMemoryEmployeeRepository.items[0];
        expect(createdEmployee.name).toBe(employeeData.name);
        expect(createdEmployee.imgUrl).toBe(employeeData.imgUrl);
        expect(createdEmployee.position).toBe(employeeData.position);
        expect(createdEmployee.access_code).toBe(employeeData.access_code);
    });
});

