import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IEmployeeProps, AttendancesEmployees } from "@/domain/attendances/entities/value-objects/attendances-with-employees";
import { Attendance as PrismaAttendance } from "@prisma/client";

export interface IAttendancePrisma extends Omit<PrismaAttendance, "employee"> {
    employee: IEmployeeProps;
}

export class PrismaAttendancesEmployeesMapper {
    static toDomain(raw: IAttendancePrisma): AttendancesEmployees {
        return AttendancesEmployees.create({
            attendanceId: raw.id,
            employee: {
                id: raw.employee.id,
                name: raw.employee.name,
                rfid: raw.employee.rfid,
            },
            clockedIn: raw.clockedIn,
            lunchStart: raw.lunchStart,
            lunchEnd: raw.lunchEnd,
            clockedOut: raw.clockedOut,
            hoursWorked: raw.hoursWorked,
            delay: raw.delay,
            extraHours: raw.extraHours,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}

