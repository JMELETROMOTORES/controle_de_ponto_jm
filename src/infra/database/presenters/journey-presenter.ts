import { Journey } from "@/domain/journey/entities/journey";

export class JourneyPresenter {
    static toHTTP(journey: Journey) {
        return {
            id: journey.id.toString(),
            name: journey.name,
            start_date: journey.start_date,
            end_date: journey.end_date,
            lunch_time_tolerance: journey.lunch_time_tolerance,
            start_date_toleranceExtraTime:
                journey.start_date_toleranceExtraTime,
            end_date_toleranceExtraTime: journey.end_date_toleranceExtraTime,
            createdAt: journey.createdAt,
            updatedAt: journey.updatedAt,
        };
    }
}

