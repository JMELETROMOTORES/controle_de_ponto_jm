import { User } from "@/domain/users/entities/User";
import {
    IListUsersRequest,
    IListUsersResponse,
    UserRepository,
} from "@/domain/users/repositories/user-repository";

export class InMemoryUsersRepository implements UserRepository {
    public items: User[] = [];

    async findByMail(email: string) {
        const user = this.items.find((item) => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async create(user: User) {
        this.items.push(user);
    }

    async list({
        search,
        limit,
        offset,
    }: IListUsersRequest): Promise<IListUsersResponse> {
        let filteredUsers = this.items;

        if (search) {
            filteredUsers = this.items.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        const startIndex = offset || 0;
        const endIndex = startIndex + (limit || this.items.length);
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        return {
            users: paginatedUsers,
            count: this.items.length,
        };
    }
}
