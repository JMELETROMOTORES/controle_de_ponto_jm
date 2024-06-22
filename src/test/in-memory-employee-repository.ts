import { Employee } from "@/domain/employee/entities/employee";
import {
    EmployeeRepository,
    IListEmployeesRequest,
    IListEmployeesResponse,
} from "@/domain/employee/repositories/employee-repository";

export class InMemoryEmployeeRepository implements EmployeeRepository {
    public items: Employee[] = [];

    async findById(id: string): Promise<Employee | null> {
        const employee = this.items.find(
            (employee) => employee.id.toString() === id,
        );

        return employee || null;
    }

    async findByRfid(rfid: string): Promise<Employee | null> {
        const employee = this.items.find((employee) => employee.rfid === rfid);

        return employee || null;
    }

    async findMany(): Promise<Employee[] | null> {
        return this.items;
    }

    async save(employee: Employee): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(employee.id));

        this.items[index] = employee;
    }

    async create(employee: Employee): Promise<void> {
        this.items.push(employee);
    }

    async delete(employee: Employee): Promise<void> {
        this.items = this.items.filter((p) => !p.id.equals(employee.id));
    }

    async list({
        search,
        limit,
        offset,
    }: IListEmployeesRequest): Promise<IListEmployeesResponse> {
        let filteredEmployees = this.items;

        if (search) {
            filteredEmployees = this.items.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        const startIndex = offset || 0;
        const endIndex = startIndex + (limit || this.items.length);
        const paginatedEmployees = filteredEmployees.slice(
            startIndex,
            endIndex,
        );
        return {
            employees: paginatedEmployees,
            count: this.items.length,
        };
    }
}

