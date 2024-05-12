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
import { PdfService } from "./domain/services/pdfservice";
import { reportRoutes } from "./routes/report-routes";
import { holidayRoutes } from "./routes/holiday-routes";
import { envs } from "./shared/envs";

import { AbonoRoutes } from "./routes/abono-routes";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);


app.use(express.json());

app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        timestamp: new Date(),
    });
});
app.use("/abono", AbonoRoutes);
app.use("/report", reportRoutes);
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

