import {
    createProductController,
    deleteProductController,
    editProductController,
    getProductController,
    listProductsController,
} from "@/infra/http/controllers/products";
import { ensureAuth } from "@/infra/middlewares/ensureAuthenticateUser";
import { Router } from "express";

const ProductRoutes = Router();

ProductRoutes.post("/", ensureAuth, (request, response, next) => {
    return createProductController.handle(request, response, next);
});

ProductRoutes.get("/", (request, response, next) => {
    return listProductsController.handle(request, response, next);
});

ProductRoutes.get("/:id", (request, response, next) => {
    return getProductController.handle(request, response, next);
});

ProductRoutes.put("/:id", ensureAuth, (request, response, next) => {
    return editProductController.handle(request, response, next);
});

ProductRoutes.delete("/:id", ensureAuth, (request, response, next) => {
    return deleteProductController.handle(request, response, next);
});

export { ProductRoutes };

