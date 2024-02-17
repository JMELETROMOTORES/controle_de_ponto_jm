import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface JourneyProps {
    name: string;
    dayOfWeek: {
        day: string;
        start_date: string;
        end_date: string;
    }[];
}

export class Journey extends Entity<JourneyProps> {
    get name() {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get dayOfWeek() {
        return this.props.dayOfWeek;
    }

    set dayOfWeek(
        dayOfWeek: {
            day: string;
            start_date: string;
            end_date: string;
        }[],
    ) {
        this.props.dayOfWeek = dayOfWeek;
    }
    static create(props: JourneyProps, id?: UniqueEntityID) {
        const journeys = new Journey(props, id);

        return journeys;
    }
}

