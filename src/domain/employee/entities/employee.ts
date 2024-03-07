import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface EmployeeProps {
    name: string;
    position: string;
    imgUrl: string;
    rfid: string;
    journeyId: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date | null;
}

export class Employee extends Entity<EmployeeProps> {
    get name() {
        return this.props.name;
    }

    get rfid() {
        return this.props.rfid;
    }

    get journeyId() {
        return this.props.journeyId;
    }

    set journeyId(journeyId: UniqueEntityID) {
        this.props.journeyId = journeyId;
        this.touch();
    }
    set name(name: string) {
        this.props.name = name;
        this.touch();
    }

    get position() {
        return this.props.position;
    }

    set position(position: string) {
        this.props.position = position;
        this.touch();
    }

    get imgUrl() {
        return this.props.imgUrl;
    }

    set imgUrl(imgUrl: string) {
        this.props.imgUrl = imgUrl;
        this.touch();
    }

    set rfid(rfid: string) {
        this.props.rfid = rfid;
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
        props: Optional<EmployeeProps, "createdAt">,
        id?: UniqueEntityID,
    ) {
        const employees = new Employee(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );

        return employees;
    }
}

