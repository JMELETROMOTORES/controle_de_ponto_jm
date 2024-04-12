import { IPdfGenerator, PdfService } from "@/domain/services/pdfservice";

export class GeneratePdfUseCase {
    constructor(private readonly pdfService: IPdfGenerator) {}
    async execute(html: string, options: any): Promise<Buffer> {
        return this.pdfService.generatePdf(html, options);
    }


}