import { Reports } from "@/domain/attendances/entities/value-objects/reports";

export class ReportPresenter {
	static toHTTP(report: Reports) {
		return {
			employeeName: report.employeeName,
			interval: report.interval,
			totalDelay: report.totalDelay,
			totalOvertime: report.totalOvertime,
			totalWorkedHours: report.totalWorkedHours,
			absences: report.absences,
			paidAbsences: report.paidAbsences,
			workDays: report.workDays,
			daysAbsences: report.daysAbsences,
		};
	}
}
