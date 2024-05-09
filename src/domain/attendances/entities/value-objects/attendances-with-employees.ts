import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-obeject";





export interface IEmployeeProps {
    id: string;
    name: string;
    rfid: string;
}

export interface AttendancesEmployeesProps {
    attendanceId: string;
    employee: IEmployeeProps;
    clockedIn?: Date | null;
    lunchStart?: Date | null;
    lunchEnd?: Date | null;
    clockedOut?: Date | null;
    hoursWorked: number;
    delay: number;
    extraHours: number;
    createdAt: Date;
    updatedAt?: Date | null;
}

export class AttendancesEmployees extends ValueObject<AttendancesEmployeesProps> {

    get attendanceId() {
        return this.props.attendanceId;
    }

    get employee() {
        return this.props.employee;
    }

    get clockedIn() {
        return this.props.clockedIn;
    }

    get lunchStart() {
        return this.props.lunchStart;
    }

    get lunchEnd() {
        return this.props.lunchEnd;
    }

    get clockedOut() {
        return this.props.clockedOut;
    }

    get hoursWorked() {
        return this.props.hoursWorked;
    }

    get delay() {
        return this.props.delay;
    }

    get extraHours() {
        return this.props.extraHours;
    }

    
    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    static create(props: AttendancesEmployeesProps) {
        return new AttendancesEmployees(props);
    }
}

