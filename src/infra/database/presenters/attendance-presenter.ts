import { Attendance } from "@/domain/attendances/entities/attendances";

export class AttendancePresenter {
    static toHTTP(attendance: Attendance) {
        return {
            id: attendance.id.toString(),
            employeeId: attendance.employeeId,
            date: attendance.date.toLocaleDateString("pt-BR", {
                weekday: "long",
                month: "long",
                day: "numeric",
            }),
            clockedIn: attendance.clockedIn,
            lunchStart: attendance.lunchStart,
            lunchEnd: attendance.lunchEnd,
            clockedOut: attendance.clockedOut,
            delay: attendance.delay,
            hoursWorked: attendance.hoursWorked,
            extraTime: attendance.extraHours,
            updatedAt: attendance.updatedAt,
        };
    }
}

