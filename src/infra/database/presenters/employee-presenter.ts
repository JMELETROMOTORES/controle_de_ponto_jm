import { Employee } from "@/domain/employee/entities/employee";

export class EmployeePresenter {
    static toHTTP(employee: Employee) {
        return {
            id: employee.id.toString(),
            name: employee.name,
            position: employee.position,
            rfid: employee.rfid,
            imgUrl: employee.imgUrl,
            journeyId: employee.journeyId.toString(),
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
        };
    }
}

