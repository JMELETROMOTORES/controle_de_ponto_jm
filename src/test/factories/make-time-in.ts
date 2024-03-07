import dayjs from "dayjs";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
    Attendance,
    AttendanceProps,
} from "@/domain/attendances/entities/attendances";

export function makeTimeIn(
    override: Partial<AttendanceProps> = {},
    id?: UniqueEntityID,
) {
    const timeIn = Attendance.create(
        {
            rfid: "123",
            date: dayjs().toDate(),
            clockedIn: new Date(),
            employeeId: "123",
            ...override,
        },
        id,
    );

    return timeIn;
}

