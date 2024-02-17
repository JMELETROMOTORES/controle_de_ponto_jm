import { PrismaClient } from "@prisma/client";
import { seedProduct } from "./seeds/product";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

const main = async () => {
    await seedProduct(prisma);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Prisma was disconnected");
    });
