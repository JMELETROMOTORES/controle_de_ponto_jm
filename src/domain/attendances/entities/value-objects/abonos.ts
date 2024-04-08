import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-obeject";


export interface IAbonos {
    rfid: string
    date: Date;
    absenseReason: string;
    paid: boolean;

}

export class Abonos extends ValueObject<IAbonos> {
    private constructor(props: IAbonos) {
        super(props);
    }


    public static create(props: IAbonos): Abonos {
        return new Abonos(props);
    }
}
