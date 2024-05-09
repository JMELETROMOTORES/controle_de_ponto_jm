import { IController } from "@/core/protocols/IController";
import { HtmlBolTemplate } from "@/core/templates/relatoriotemplate";
import { GeneratePdfUseCase } from "@/domain/attendances/use-cases/generate-pdf-use-case";
import e from "cors";

class GeneratePdfController implements IController {
    constructor(private readonly useCase: GeneratePdfUseCase) {}

    async handle(request: any, response: any, next: any): Promise<void | any> {
        try {
            
            const options = { 
                format: 'A4',
                orientation: 'portrait'
            }

            const { rfid, startDate, endDate } = request.params;

            const result = await this.useCase.execute(
                rfid, startDate, endDate,
                options,
            );

            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
            response.send(result);
            
        } catch (error) {
          console.error(error);
          response.status(500).send('Erro ao gerar o PDF');
        }
    }
}

export { GeneratePdfController };