import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";

export class NotFoundEmployeeReportError extends ErrorHandler {
	constructor(rfid: string) {
		super(`Funcionário com o RFID ( ${rfid}) não possui registros na data selecionada`, HttpStatusCode.NOT_FOUND);
	}
}
