import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-obeject";


export interface IPaidAbs {
    date: Date;
    reason: string;
}
export interface IReports {
    employeeId: UniqueEntityID;
    totalDelay: number;
    totalOvertime: number;
    totalWorkedHours: number;
    absences: number;
    daysAbsences: Date[];
    paidAbsences: IPaidAbs[];
}

export class Reports extends ValueObject<IReports> {

    private constructor(props: IReports) {
        super(props);
    }

    get employeeId(): UniqueEntityID {
        return this.props.employeeId;
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
