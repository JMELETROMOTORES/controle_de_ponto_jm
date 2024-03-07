import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeEmployee } from "@/test/factories/make-employee";
import { InMemoryEmployeeRepository } from "@/test/in-memory-employee-repository";
import { RfidAlreadyUseError } from "../errors/Rfid-already-use";
import { MinimunLengthRfidError } from "../errors/minimum-length-rfid";
import { CreateEmployeeUseCase } from "./create-employee";

let inMemoryEmployeeRepository: InMemoryEmployeeRepository;
let sut: CreateEmployeeUseCase;

describe("Create Employee Use Case", () => {
    beforeEach(() => {
        inMemoryEmployeeRepository = new InMemoryEmployeeRepository();
        sut = new CreateEmployeeUseCase(inMemoryEmployeeRepository);
    });

    it("should be able to create a new employee", async () => {
        const employeeData1 = {
            name: "Employee Name",
            imgUrl: "Employee Image",
            position: "Employee Position",
            rfid: "12345678910",
            journeyId: new UniqueEntityID("1"),
        };

        const result = await sut.execute(employeeData1);

        expect(result.isRight()).toBe(true);
        expect(result.value).toEqual({
            employee: inMemoryEmployeeRepository.items[0],
        });
        const createdEmployee = inMemoryEmployeeRepository.items[0];
        expect(createdEmployee.name).toBe(employeeData1.name);
        expect(createdEmployee.imgUrl).toBe(employeeData1.imgUrl);
        expect(createdEmployee.position).toBe(employeeData1.position);
        expect(createdEmployee.rfid).toBe(employeeData1.rfid);
    });

    it("should not create a employee with the same RFID", async () => {
        const employee = makeEmployee({
            name: "Employee Name",
            imgUrl: "Employee Image",
            position: "Employee Position",
            rfid: "12345678910",
            journeyId: new UniqueEntityID("1"),
        });

        await inMemoryEmployeeRepository.create(employee);

        const employeeData1 = {
            name: "Employee Name",
            imgUrl: "Employee Image",
            position: "Employee Position",
            rfid: "12345678910",
            journeyId: new UniqueEntityID("1"),
        };

        const result = await sut.execute(employeeData1);

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(RfidAlreadyUseError);
    });

    it("should not create a employee with a RFID less than 10 characters", async () => {
        const employeeData1 = {
            name: "Employee Name",
            imgUrl: "Employee Image",
            position: "Employee Position",
            rfid: "123456789",
            journeyId: new UniqueEntityID("1"),
        };

        const result = await sut.execute(employeeData1);

        expect(result.isLeft()).toBe(true);

        expect(result.value).toBeInstanceOf(MinimunLengthRfidError);
    });
});
