import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { HashGenerator } from "../cryptography/hash-generator";
import { User } from "../entities/User";
import { UserAlreadyExistsError } from "../errors/user-already-exists.error";
import { UserRepository } from "../repositories/user-repository";

export interface IRegisterUserDTO {
    name: string;
    email: string;
    password: string;
    role: string;
}

type RegisterUserUseCaseResponse = Either<
    UserAlreadyExistsError,
    {
        user: User;
    }
>;

export class RegisterUserUseCase
    implements IUseCase<IRegisterUserDTO, RegisterUserUseCaseResponse>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashGenerator: HashGenerator,
    ) {}

    async execute({
        name,
        email,
        password,
        role,
    }: IRegisterUserDTO): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await this.userRepository.findByMail(email);

        if (userWithSameEmail) {
            return left(new UserAlreadyExistsError());
        }

        const hashedPassword = await this.hashGenerator.hash(password);

        const user = User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await this.userRepository.create(user);

        return right({
            user,
        });
    }
}

