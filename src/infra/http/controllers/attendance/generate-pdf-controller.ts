import { IController } from "@/core/protocols/IController";
import { GeneratePdfUseCase } from "@/domain/attendances/use-cases/generate-pdf-use-case";
import e from "cors";

class GeneratePdfController implements IController {
    constructor(private readonly useCase: GeneratePdfUseCase) {}

    async handle(request: any, response: any, next: any): Promise<void | any> {
        try {
            const html = `ola mundo!`
            const options = { 
                format: 'A4',
                orientation: 'portrait',
                border: {
                    top: '1in',
                    right: '1in',
                    bottom: '1in',
                    left: '1in'
                }
            }

            const result = await this.useCase.execute(
                html,
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