import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-obeject";


export interface IPaidAbs {
    date: Date;
    absenseReason: string;
}

type workDay = {
    date: Date | null | undefined;
    clockedIn: Date | null | undefined;  
    lunchStart: Date | null | undefined;
    lunchEnd: Date | null | undefined; 
    clockedOut: Date | null | undefined;
    hoursWorked: number | null | undefined;
    delay: number | null | undefined;
    overtime: number | null | undefined;
}
export interface IReports {
    employeeName: string;
    totalDelay: number;
    totalOvertime: number;
    totalWorkedHours: number;
    absences: number;
    daysAbsences: Date[];
    paidAbsences: any;
    interval: string;
    workDays: workDay[];
}

export class Reports extends ValueObject<IReports> {

    private constructor(props: IReports) {
        super(props);
    }

    get employeeName(): string {
        return this.props.employeeName;
    }

    get interval(): string {
        return this.props.interval;
    }

    get totalDelay(): number {
        return this.props.totalDelay;
    }

    get totalOvertime(): number {
        return this.props.totalOvertime;
    }

    get totalWorkedHours(): number {
        return this.props.totalWorkedHours;
    }

    get workDays(): workDay[] {
        return this.props.workDays;
    }

    get absences(): number {
        return this.props.absences;
    }

    get daysAbsences(): Date[] {
        return this.props.daysAbsences;
    }

    get paidAbsences(): [] {
        return this.props.paidAbsences;
    }

    public static create(props: IReports): Reports {
        return new Reports(props);
    }
}
