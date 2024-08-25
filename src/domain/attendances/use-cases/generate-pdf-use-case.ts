import { HtmlBolTemplate } from "@/core/templates/relatoriotemplate";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { IPdfGenerator, PdfService } from "@/domain/services/pdfservice";
import { GenerateReportUseCase } from "./generate-report";

export class GeneratePdfUseCase {
	constructor(
		private readonly pdfService: IPdfGenerator,

		private readonly generateReportUseCase: GenerateReportUseCase,
	) {}
	async execute(rfid: string, startDate: Date, endDate: Date, options: any): Promise<any> {
		const report = await this.generateReportUseCase.execute({ rfid, startDate, endDate });
		if (report.value) {
			if ("reports" in report.value) {
				console.log("===============================", report.value.reports);
				if (!report.value.reports) {
					throw new Error("Report not found");
				}

				const html2 = HtmlBolTemplate(report.value?.reports);
				return this.pdfService.generatePdf(html2, options);
			}
		}
	}
}
