import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

const ensureAuth = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new ErrorHandler("Token is missing", HttpStatusCode.UNAUTHORIZED);

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(
            token,
            String(process.env.JWT_SECRET),
        ) as IPayload;
        request.userId = sub;
        return next();
    } catch (error) {
        throw new ErrorHandler("Token invalid", HttpStatusCode.UNAUTHORIZED);
    }
};

export { ensureAuth };

