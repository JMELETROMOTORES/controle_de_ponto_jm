import { Encrypter } from "@/domain/users/cryptography/encrypter";
import { sign } from "jsonwebtoken";

export class JwtEncrypter implements Encrypter {
    constructor() {}

    async encrypt(payload: any): Promise<string> {
        return sign(payload, String(process.env.JWT_SECRET));
    }
}

