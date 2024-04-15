import { HtmlBolTemplate } from "@/core/templates/relatoriotemplate";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { IPdfGenerator, PdfService } from "@/domain/services/pdfservice";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { start } from "repl";
import { GenerateReportUseCase } from "./generate-report";

export class GeneratePdfUseCase {
    constructor(private readonly pdfService: IPdfGenerator,

        private readonly generateReportUseCase: GenerateReportUseCase
    ) {}
    async execute(rfid: string, options: any): Promise<Buffer> {
        const startDate = new Date( 2024, 4, 1);
        const endDate = new Date( 2024, 4, 30);
        const report = await this.generateReportUseCase.execute({rfid, startDate, endDate});



        if (!report.value?.report) {
            throw new Error('Report not found');
        }

        const html2 = HtmlBolTemplate(report.value?.report, 'leo');
        return this.pdfService.generatePdf(html2, options);


    }


}