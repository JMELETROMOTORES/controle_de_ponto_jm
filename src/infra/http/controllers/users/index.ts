import { AuthenticateUserUseCase } from "@/domain/users/use-cases/authenticate-user";

import { RegisterUserUseCase } from "@/domain/users/use-cases/register-user";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { UserPrismaRepository } from "@/infra/database/repositories/prisma-user-repository";
import { JwtEncrypter } from "./../../../cryptography/jwt-encrypter";
import { AuthenticateUserController } from "./authenticate-user-controller";
import { CreateUserController } from "./create-account-controller";

const jwtEncrypter = new JwtEncrypter();
const bcryptHasher = new BcryptHasher();

const prismaUserRepository = new UserPrismaRepository();
const registerUserUseCase = new RegisterUserUseCase(
    prismaUserRepository,
    bcryptHasher,
);
const authenticateUserUseCase = new AuthenticateUserUseCase(
    prismaUserRepository,
    bcryptHasher,
    jwtEncrypter,
);
const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
);
const createAccountController = new CreateUserController(registerUserUseCase);

export { authenticateUserController, createAccountController };

