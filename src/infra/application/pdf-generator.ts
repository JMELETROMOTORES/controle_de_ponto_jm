import { IPdfGenerator } from '@/domain/services/pdfservice';
import * as puppeteer from 'puppeteer';

export class PuppeteerPdfGenerator implements IPdfGenerator {
    async generatePdf(html: string, options?: puppeteer.PDFOptions): Promise<Buffer> {
        return new Promise(async (resolve, reject) => {
            try {
                // Inicia o navegador em modo headless com a opção --no-sandbox
                const browser = await puppeteer.launch({
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                const page = await browser.newPage();
                
                // Define o conteúdo HTML da página
                await page.setContent(html);

                // Gera o PDF a partir do conteúdo HTML
                const buffer = await page.pdf(options);

                // Fecha o navegador
                await browser.close();

                resolve(buffer);
            } catch (error) {
                reject(error);
            }
        });
    }
}
