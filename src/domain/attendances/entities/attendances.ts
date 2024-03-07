import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AttendanceProps {
    rfid: string;
    date: Date;
    clockedIn: Date;
    lunchStart?: Date;
    lunchEnd?: Date;
    clockedOut?: Date;
    hoursWorked: number;
    delay: number;
    extraHours: number;
    employeeId: string;
    createdAt?: Date;
    updatedAt?: Date | null;
}

export class Attendance extends Entity<AttendanceProps> {
    get rfid() {
        return this.props.rfid;
    }

    get employeeId() {
        return this.props.employeeId;
    }

    get date() {
        return this.props.date;
    }

    set date(date: Date) {
        this.props.date = date;
    }

    get clockedIn() {
        return this.props.clockedIn;
    }

    set clockedIn(clockedIn: Date) {
        this.props.clockedIn = clockedIn;
        this.touch();
    }

    get lunchStart() {
        return this.props.lunchStart;
    }

    set lunchStart(lunchStart: Date | undefined) {
        this.props.lunchStart = lunchStart;
        this.touch();
    }

    get lunchEnd() {
        return this.props.lunchEnd;
    }

    set lunchEnd(lunchEnd: Date | undefined) {
        this.props.lunchEnd = lunchEnd;
        this.touch();
    }

    get clockedOut() {
        return this.props.clockedOut;
    }

    set clockedOut(clockedOut: Date | undefined) {
        this.props.clockedOut = clockedOut;
        this.touch();
    }

    get hoursWorked() {
        return this.props.hoursWorked;
    }

    set hoursWorked(hoursWorked: number) {
        this.props.hoursWorked = hoursWorked;
    }

    get delay() {
        return this.props.delay;
    }

    set delay(delay: number) {
        this.props.delay = delay;
    }

    get extraHours() {
        return this.props.extraHours;
    }

    set extraHours(extraHours: number) {
        this.props.extraHours = extraHours;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    static create(
        props: Optional<
            AttendanceProps,
            | "extraHours"
            | "hoursWorked"
            | "date"
            | "clockedIn"
            | "createdAt"
            | "delay"
        >,
        id?: UniqueEntityID,
    ) {
        const attendance = new Attendance(
            {
                ...props,
                date: props.date ?? new Date(),
                extraHours: props.extraHours ?? 0,
                delay: props.delay ?? 0,
                hoursWorked: props.hoursWorked ?? 0,
                clockedIn: props.clockedIn ?? new Date(),
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );
        return attendance;
    }
}

