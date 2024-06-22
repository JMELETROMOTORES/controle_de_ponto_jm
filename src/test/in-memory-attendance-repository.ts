import { Attendance } from "@/domain/attendances/entities/attendances";
import { AttendancesEmployees } from "@/domain/attendances/entities/value-objects/attendances-with-employees";
import {
    AttendanceRepository,
    IListAttendancesRequest,
    IListAttendancesResponse,
} from "@/domain/attendances/repositories/attendance-repository";

export class InMemoryAttendanceRepository implements AttendanceRepository {
    public items: Attendance[]  = [];
    public attendancesEmployees: AttendancesEmployees[] = [];


    async findById(id: string): Promise<Attendance | null> {
        const attendance = this.items.find(
            (attendance) => attendance.id.toString() === id,
        );

        return attendance || null;
    }

    async findMany(startDate: Date, endDate: Date): Promise<Attendance[] | null> {
        const attendances = this.items.filter(
            (attendance) =>
                attendance.date >= startDate && attendance.date <= endDate,
        );

        return attendances || null;
    }
    async findByEmployeeId(employeeId: string): Promise<AttendancesEmployees[] | null> {
        const attendances = this.attendancesEmployees.filter(
            (attendance) => attendance.employee.id === employeeId,
        );

        return attendances || null;
    }
    
    async findByDateAndRfid(date: Date, rfid: string): Promise<Attendance | null> {
        const attendance = this.items.find(
            (attendance) =>
                attendance.date.toDateString() === date.toDateString() && attendance.rfid === rfid,
        );
        
        return attendance || null;
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
        let filteredAttendances = this.attendancesEmployees;

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

