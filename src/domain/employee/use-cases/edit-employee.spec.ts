import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { makeEmployee } from "@/test/factories/make-employee";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { RfidAlreadyUseError } from "../errors/Rfid-already-use";
import { EditEmployeeUseCase } from "./edit-employee";

let inMemoryEmployeesRepository: InMemoryEmployeeRepository;

let sut: EditEmployeeUseCase;

describe("Edit Employee", () => {
    beforeEach(() => {
        inMemoryEmployeesRepository = new InMemoryEmployeeRepository();
        sut = new EditEmployeeUseCase(inMemoryEmployeesRepository);
    });

    it("should be able to edit a employee", async () => {
        const newEmployee = makeEmployee(
            {
                name: "Employee 1",
                position: "Developer",
                imgUrl: "image.png",
                rfid: "12345609383",
                journeyId: new UniqueEntityID("1"),
            },
            new UniqueEntityID("1"),
        );

        await inMemoryEmployeesRepository.create(newEmployee);

        const result = await sut.execute({
            id: newEmployee.id.toString(),
            name: "Employee 2",
            position: "faxineiro",
            imgUrl: "image.png",
            rfid: "12345609383",
            journeyId: new UniqueEntityID("2"),
        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryEmployeesRepository.items[0].name).toBe("Employee 2");
        expect(inMemoryEmployeesRepository.items[0].position).toBe("faxineiro");
        expect(inMemoryEmployeesRepository.items[0].rfid).toBe("12345609383");
    });

    it("should not be able to edit a employee with an existing rfid", async () => {
        const employee = makeEmployee({
            name: "Employee 1",
            position: "Developer",
            imgUrl: "image.png",
            rfid: "123456",
        });

        await inMemoryEmployeesRepository.create(employee);

        const existingEmployee = makeEmployee({
            name: "Employee 2",
            position: "Developer",
            imgUrl: "image.png",
            rfid: "1234567",
        });

        await inMemoryEmployeesRepository.create(existingEmployee);

        const result = await sut.execute({
            id: employee.id.toString(),
            name: "Employee 2",
            position: "Developer",
            imgUrl: "image.png",
            rfid: "1234567",
            journeyId: new UniqueEntityID("1"),
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(RfidAlreadyUseError);
    });
});

