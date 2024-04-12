import { IPdfGenerator } from '@/domain/services/pdfservice';
import * as htmlPdf from 'html-pdf';


export class HtmlPdfGenerator implements IPdfGenerator {
    generatePdf(html: string, options?: any): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            htmlPdf.create(html, options).toBuffer((err, buffer) => {
                if (err) reject(err);
                else resolve(buffer);
            });
        });
    }
}