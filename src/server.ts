import app from ".";
import { context } from "./infra/database/context";

app.listen(process.env.PORT ?? 3334, () =>
    console.log(`Server is running at ${process.env.PORT}!`),
).on("close", () => {
    context.prisma.$disconnect();
    console.log("Prisma was disconnected");
});

