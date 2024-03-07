import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface JourneyProps {
    name: string;
    start_date: string;
    start_date_toleranceExtraTime: string;
    start_date_toleranceDelay: string;
    end_date: string;
    end_date_toleranceExtraTime: string;
    lunch_time_tolerance: number;
    createdAt: Date;
    updatedAt?: Date | null;
}

export class Journey extends Entity<JourneyProps> {
    get name() {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get lunch_time_tolerance() {
        return this.props.lunch_time_tolerance;
    }

    get start_date_toleranceExtraTime() {
        return this.props.start_date_toleranceExtraTime;
    }

    get start_date_toleranceDelay() {
        return this.props.start_date_toleranceDelay;
    }

    set start_date_toleranceDelay(start_date_toleranceDelay: string) {
        this.props.start_date_toleranceDelay = start_date_toleranceDelay;
        this.touch();
    }

    set lunch_time_tolerance(lunch_time_tolerance: number) {
        this.props.lunch_time_tolerance = lunch_time_tolerance;
        this.touch();
    }

    get start_date() {
        return this.props.start_date;
    }

    set start_date(start_date: string) {
        this.props.start_date = start_date;
        this.touch();
    }

    get end_date() {
        return this.props.end_date;
    }

    get end_date_toleranceExtraTime() {
        return this.props.end_date_toleranceExtraTime;
    }
    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    set end_date(end_date: string) {
        this.props.end_date = end_date;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }
    static create(
        props: Optional<JourneyProps, "createdAt">,
        id?: UniqueEntityID,
    ) {
        const journeys = new Journey(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );

        return journeys;
    }
}

