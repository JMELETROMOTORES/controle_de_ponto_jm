import { Attendance } from "@/domain/attendances/entities/attendances";
import { AttendancesEmployees } from "@/domain/attendances/entities/value-objects/attendances-with-employees";

export class AttendanceEmployeePresenter {
    static toHTTP(attendance: AttendancesEmployees) {
        return {
            attendanceId: attendance.attendanceId,
            employee: {
                id: attendance.employee.id,
                name: attendance.employee.name,
                rfid: attendance.employee.rfid,
            },
            clockedIn: attendance.clockedIn,
            lunchStart: attendance.lunchStart,
            lunchEnd: attendance.lunchEnd,
            clockedOut: attendance.clockedOut,
            delay: attendance.delay,
            hoursWorked: attendance.hoursWorked,
            extraTime: attendance.extraHours,
            createdAt: attendance.createdAt,
            updatedAt: attendance.updatedAt,
        };
    }
}

