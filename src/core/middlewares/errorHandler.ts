import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { ErrorHandler } from "../errors/ErrorHandler";

export const errorHandler = (
    error: ErrorHandler | Error | ValidationError,
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response => {
    if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }

    if (error instanceof ValidationError) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            message: error.message,
        });
    }

    if (error instanceof Error) {
        console.error(error.message);
        return res.status(HttpStatusCode.SERVER_ERROR).json({
            message: "Internal server error",
        });
    }

    return res
        .status(HttpStatusCode.SERVER_ERROR)
        .json({ message: "Unexpected error.", error });
};
