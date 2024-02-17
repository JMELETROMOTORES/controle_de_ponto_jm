import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface IUserPresenter {
    id: UniqueEntityID;
    name: string;
    email: string;
    password: string;
}

export class UserPresenter {
    static toHTTP(user: IUserPresenter) {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}

