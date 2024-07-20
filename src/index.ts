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
import allowCors from './infra/middlewares/allowCors';
import { AbonoRoutes } from "./routes/abono-routes";
import dayjs from "dayjs";
// import { integrationRoutes } from "./routes/integration-routes";

dotenv.config();
const app = express();
app.use(
    allowCors
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
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
// app.use("/integration", integrationRoutes);
app.use("/schedules", SchedulesAttendancesRoutes);
app.use("/attendances", AttendancesRoutes);
app.use("/journey", JourneyRoutes);
app.use("/auth", userRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/holiday", holidayRoutes);

if (envs.nodeEnv === "development") {
    app.use(
        "/public/files",
        express.static(path.resolve(__dirname, "shared", "infra", "temp")),
    );
}

app.use("/public/static", express.static(path.resolve(__dirname, "public")));

export default app;

