import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { HashComparer } from "@/domain/users/cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "../errors/wrong-credentials-error";
import { UserRepository } from "../repositories/user-repository";

interface IAuthenticaseUserDTO {
    email: string;
    password: string;
}

type AuthenticateUserUseCaseResponse = Either<
    WrongCredentialsError,
    {
        accessToken: string;
    }
>;

export class AuthenticateUserUseCase
    implements IUseCase<IAuthenticaseUserDTO, AuthenticateUserUseCaseResponse>
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
    ) {}
    async execute({
        email,
        password,
    }: IAuthenticaseUserDTO): Promise<AuthenticateUserUseCaseResponse> {
        const user = await this.userRepository.findByMail(email);

        if (!user) {
            return left(new WrongCredentialsError());
        }

        const isPasswordValid = await this.hashComparer.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            return left(new WrongCredentialsError());
        }

        const accessToken = await this.encrypter.encrypt({
            sub: user.id.toString(),
            role: user.role,
        });

        return right({
            accessToken,
        });
    }
}

