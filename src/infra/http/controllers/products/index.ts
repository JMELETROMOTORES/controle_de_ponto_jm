import { OffsetGenerator } from "@/core/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/core/pagination/adapters/implementations/TotalPagesGenerator";
import { CreateProductUseCase } from "@/domain/products/use-cases/create-product";
import { DeleteProductUseCase } from "@/domain/products/use-cases/delete-product";
import { EditProductUseCase } from "@/domain/products/use-cases/edit-product";
import { ListProductsUseCase } from "@/domain/products/use-cases/fetch-products";
import { GetProductUseCase } from "@/domain/products/use-cases/get-product-by-id";
import { ProductPrismaRepository } from "@/infra/database/repositories/prisma-product-repository";
import { CreateProductController } from "./create-product-controller";
import { DeleteProductController } from "./delete-product-controller";
import { EditProductController } from "./edit-product-controller";
import { ListProductsController } from "./fetch-products-controller";
import { GetProductController } from "./get-product-by-id-controller";

// all
const productRepository = new ProductPrismaRepository();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();

// create product
const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(
    createProductUseCase,
);

// list products
const listProductsUseCase = new ListProductsUseCase(
    productRepository,
    offsetGenerator,
    totalPagesGenerator,
);
const listProductsController = new ListProductsController(listProductsUseCase);

// get product by id
const getProductUseCase = new GetProductUseCase(productRepository);
const getProductController = new GetProductController(getProductUseCase);

// edit product

const editProductUseCase = new EditProductUseCase(productRepository);
const editProductController = new EditProductController(editProductUseCase);

// delete product

const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
);

export {
    createProductController,
    deleteProductController,
    editProductController,
    getProductController,
    listProductsController,
};

