import { PrismaClient } from "@prisma/client";
import { seedJourney } from "./seeds/journey";
import { seedEmployee } from "./seeds/employee";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

const main = async () => {
    await seedJourney(prisma);
    await seedEmployee(prisma);
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
