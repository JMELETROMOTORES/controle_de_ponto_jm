import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Journey } from "@/domain/journey/entities/journey";

export interface EmployeeProps {
    journeyId: UniqueEntityID;
    Journey?: Journey;
    name: string;
    position: string;
    imgUrl: string;
    access_code: string;
}

export class Employee extends Entity<EmployeeProps> {
    get name() {
        return this.props.name;
    }

    get journeyId() {
        return this.props.journeyId;
    }

    get Journey() {
        return this.props.Journey;
    }
    set name(name: string) {
        this.props.name = name;
    }

    get position() {
        return this.props.position;
    }

    set position(position: string) {
        this.props.position = position;
    }

    get imgUrl() {
        return this.props.imgUrl;
    }

    set imgUrl(imgUrl: string) {
        this.props.imgUrl = imgUrl;
    }

    get access_code() {
        return this.props.access_code;
    }

    set access_code(access_code: string) {
        this.props.access_code = access_code;
    }

    static create(props: EmployeeProps, id?: UniqueEntityID) {
        const employees = new Employee(props, id);

        return employees;
    }
}

