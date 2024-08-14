import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";
import express from "express";
import { errorHandler } from "./core/middlewares/errorHandler";
import { AttendancesRoutes } from "./routes/attendances-routes";
import { EmployeeRoutes } from "./routes/employee.routes";
import { JourneyRoutes } from "./routes/journey.routes";
import { SchedulesAttendancesRoutes } from "./routes/register-attendances-routes";
import { userRoutes } from "./routes/users.routes";
import { reportRoutes } from "./routes/report-routes";
import { holidayRoutes } from "./routes/holiday-routes";
import { envs } from "./shared/envs";
import { AbonoRoutes } from "./routes/abono-routes";
import dayjs from "dayjs";
dotenv.config();

const app = express();

// Middleware para configurar CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Tratamento das requisições OPTIONS separadamente
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.sendStatus(200);
});

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        timeStamp: dayjs.utc().toDate(),
    });
});

app.use("/abono", AbonoRoutes);
app.use("/report", reportRoutes);
app.use("/schedules", SchedulesAttendancesRoutes);
app.use("/attendances", AttendancesRoutes);
app.use("/journey", JourneyRoutes);
app.use("/auth", userRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/daysoff", holidayRoutes);

if (envs.nodeEnv === "dev") {
    app.use(
        "/public/files",
        express.static(path.resolve(__dirname, "shared", "infra", "temp")),
    );
}

app.use("/public/static", express.static(path.resolve(__dirname, "public")));

export default app;
