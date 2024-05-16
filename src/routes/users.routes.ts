import {
    authenticateUserController,
    createAccountController,
} from "@/infra/http/controllers/users";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/register", (request, response, next) => {
    return createAccountController.handle(request, response, next);
});

userRoutes.post("/authenticate", (request, response, next) => {
    return authenticateUserController.handle(request, response, next);
});

export { userRoutes };

