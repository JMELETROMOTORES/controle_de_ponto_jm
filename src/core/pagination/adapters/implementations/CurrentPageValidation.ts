import { HttpStatusCode } from "@/core/constants/HttpStatusCode";
import { ErrorHandler } from "@/core/errors/ErrorHandler";
import {
    ICurrentPageValidation,
    ICurrentPageValidationParams,
} from "../ICurrentPageValidation";

export class CurrentPageValidation implements ICurrentPageValidation {
    validate({
        currentPage,
        totalPages,
    }: ICurrentPageValidationParams): boolean {
        if (totalPages === 0 && currentPage === 0) {
            return true;
        }

        if ((currentPage ?? 0) >= totalPages) {
            throw new ErrorHandler(
                "Page out of bounds",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        return true;
    }
}
