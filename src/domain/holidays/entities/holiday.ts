import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface HolidayProps {
    reason: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export class Holiday extends Entity<HolidayProps> {
    get reason() {
        return this.props.reason;
    }

    get date() {
        return this.props.date;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    set reason(value: string) {
        this.props.reason = value;
        this.touch();
    }

    set date(value: Date) {
        this.props.date = value;
        this.touch();
    }

    set updatedAt(value: Date) {
        this.props.updatedAt = value;
        this.touch();
    }


    private touch() {
        this.props.updatedAt = new Date();
    }
    static create(
        props: Optional<HolidayProps, "createdAt" | "updatedAt">,
        id?: UniqueEntityID,
    ) {
        const holidays = new Holiday(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt ?? new Date(),
            },  
            id,
        );

        return holidays;
    }
}

