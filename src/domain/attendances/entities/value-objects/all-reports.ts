import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-obeject";



export interface IAllReports {
    employeeName: string;
    totalDelay: number;
    totalOvertime: number;
    totalWorkedHours: number;
    absences: number;
    // paidAbsences: any;
    // interval: string;
}

export class AllReports extends ValueObject<IAllReports> {

    private constructor(props: IAllReports) {
        super(props);
    }

    get employeeName(): string {
        return this.props.employeeName;
    }

    // get interval(): string {
    //     return this.props.interval;
    // }

    get totalDelay(): number {
        return this.props.totalDelay;
    }

    get totalOvertime(): number {
        return this.props.totalOvertime;
    }

    get totalWorkedHours(): number {
        return this.props.totalWorkedHours;
    }

  

    // get paidAbsences(): [] {
    //     return this.props.paidAbsences;
    // }

    public static create(props: IAllReports): AllReports {
        return new AllReports(props);
    }
}
