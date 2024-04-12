
export interface IPdfGenerator {
  generatePdf(html: string, options?: any): Promise<Buffer>;
}

export class PdfService {
  constructor(private pdfGenerator: IPdfGenerator) {}

  async generatePdf(html: string, options?: any): Promise<Buffer> {
      return this.pdfGenerator.generatePdf(html, options);
  }
}