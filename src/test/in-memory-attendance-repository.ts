import { Attendance } from "@/domain/attendances/entities/attendances";
import {
    AttendanceRepository,
    IListAttendancesRequest,
    IListAttendancesResponse,
} from "@/domain/attendances/repositories/attendance-repository";

export class InMemoryAttendanceRepository implements AttendanceRepository {
    public items: Attendance[] = [];

    async findById(id: string): Promise<Attendance | null> {
        const attendance = this.items.find(
            (attendance) => attendance.id.toString() === id,
        );

        return attendance || null;
    }

    async findByEmployeeId(employeeId: string): Promise<Attendance[] | null> {
        const attendances = this.items.filter(
            (attendance) => attendance.employeeId.toString() === employeeId,
        );

        console.log(attendances);
        return attendances || null;
    }

    async findByRfid(rfid: string): Promise<Attendance | null> {
        const attendance = this.items.find(
            (attendance) => attendance.rfid === rfid,
        );

        return attendance || null;
    }

    async findAllByRfid(rfid: string): Promise<Attendance[] | null> {
        const attendances = this.items.filter(
            (attendance) => attendance.rfid === rfid,
        );

        return attendances || null;
    }
    
    async generateReport(rfid: string, startDate: Date, endDate: Date): Promise<Attendance[] | null> {
        const attendances = this.items.filter(
            (attendance) => attendance.rfid === rfid,
        );

        const filteredAttendances = attendances.filter((attendance) => {
            const attendanceDate = new Date(attendance.date);
            return attendanceDate >= startDate && attendanceDate <= endDate;
        });

        return filteredAttendances || null;
    }

    async save(attendance: Attendance): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(attendance.id));

        this.items[index] = attendance;
    }

    async create(attendance: Attendance): Promise<void> {
        this.items.push(attendance);
    }

    async delete(attendance: Attendance): Promise<void> {
        this.items = this.items.filter((p) => !p.id.equals(attendance.id));
    }

    async list({
        search,
        limit,
        offset,
    }: IListAttendancesRequest): Promise<IListAttendancesResponse> {
        let filteredAttendances = this.items;

        if (search) {
        }
        const startIndex = offset || 0;
        const endIndex = startIndex + (limit || this.items.length);
        const paginatedAttendances = filteredAttendances.slice(
            startIndex,
            endIndex,
        );
        return {
            attendances: paginatedAttendances,
            count: this.items.length,
        };
    }
}

