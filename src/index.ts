import cors from "cors";
import * as dotenv from "dotenv";
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
app.use("/user", userRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/holiday", holidayRoutes);
// const pdfGenerator = new HtmlPdfGenerator();
// const pdfService = new PdfService(pdfGenerator);
// app.get('/generate-pdf', async (req, res) => {
    
//     const html = `<h1>Olá, mundo!</h1>`;
//     const options = {
//         format: 'A4',
//     };
//     try {
//         const pdfBuffer = await pdfService.generatePdf(html, options);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Erro ao gerar o PDF');
//     }
// });

export default app;

