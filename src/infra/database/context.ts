import { PrismaClient } from "@prisma/client";
import { envs } from "@/shared/envs";
const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "stdout",
            level: "error",
        },
        {
            emit: "stdout",
            level: "info",
        },
        {
            emit: "stdout",
            level: "warn",
        },
    ],
    datasources: {
        db: {
            url: envs.databaseUrl,
        },

    }
    
});
console.log("Database URL: ", envs.databaseUrl);
prisma.$on("query", (e: any) => {
    // console.log("Query: ", e.query);
    // console.log("Duration: ", e.duration);
});

export interface IContext {
    prisma: PrismaClient;
}

export const context: IContext = {
    prisma,
};

