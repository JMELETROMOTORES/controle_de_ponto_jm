import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-obeject";


export interface IPaidAbs {
    date: Date;
    absenseReason: string;
}
export interface IReports {
    employeeName: string;
    totalDelay: number;
    totalOvertime: number;
    totalWorkedHours: number;
    absences: number;
    daysAbsences: Date[];
    paidAbsences: IPaidAbs[];
    interval: string;
    workDays: object[];
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

    get workDays(): object[] {
        return this.props.workDays;
    }

    get absences(): number {
        return this.props.absences;
    }

    get daysAbsences(): Date[] {
        return this.props.daysAbsences;
    }

    get paidAbsences(): IPaidAbs[] {
        return this.props.paidAbsences;
    }

    public static create(props: IReports): Reports {
        return new Reports(props);
    }
}
