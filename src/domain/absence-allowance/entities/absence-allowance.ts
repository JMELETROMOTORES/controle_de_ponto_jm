import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AbsenceAllowanceProps {
    employeeId: string;
    reason: string;
    date: Date;
    createdAt: Date;
    updatedAt?: Date;
}

export class AbsenceAllowance extends Entity<AbsenceAllowanceProps> {
    get reason() {
        return this.props.reason;
    }

    get date() {
        return this.props.date;
    }

    get employeeId() {
        return this.props.employeeId;
    }

    set employeeId(employeeId: string) {
        this.props.employeeId = employeeId;
        this.touch();
    }

    
    set reason(reason: string) {
        this.props.reason = reason;
        this.touch();
    }

    set date(date: Date) {
        this.props.date = date;
        this.touch();
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
        props: Optional<AbsenceAllowanceProps, "createdAt" | "updatedAt"> ,
        id?: UniqueEntityID,
    ) {
        const absenceallowances = new AbsenceAllowance(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );

        return absenceallowances;
    }
}

