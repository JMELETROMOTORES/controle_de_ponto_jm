import { Attendance } from "@/domain/attendances/entities/attendances";
import { Reports } from "@/domain/attendances/entities/value-objects/reports";

export const HtmlBolTemplate = (attendances: Reports, cliNome: string) => {
  return `<!DOCTYPE html>
  <html lang="pt-BR">
  <body>
  <h1>
      teste
  </h1>
  </body>
  </html>
  `;
};
