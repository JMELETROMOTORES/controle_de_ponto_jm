import { PrismaClient } from "@prisma/client";
import { seedJourney } from "./seeds/journey";
import { seedEmployee } from "./seeds/employee";
import * as dotenv from "dotenv";
import path from "path";
import { envs } from "../src/shared/envs";
dotenv.config({ path: path.resolve(__dirname, '../.env.dev') });
const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

const main = async () => {
    await seedJourney(prisma);
    await seedEmployee(prisma);
};
console.log("Database URL: ", envs.databaseUrl);
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Prisma was disconnected");
    });
