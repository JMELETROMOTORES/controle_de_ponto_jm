import { AbsenceAllowance } from "@/domain/absence-allowance/entities/absence-allowance";


export class AbsenceAllowancePresenter {
    static toHTTP(absenceallowance: AbsenceAllowance) {
        return {
            id: absenceallowance.id.toString(),
            employeeId: absenceallowance.employeeId,
            reason: absenceallowance.reason,
            date: absenceallowance.date,
            createdAt: absenceallowance.createdAt,
            updatedAt: absenceallowance.updatedAt,
        };
    }
}

