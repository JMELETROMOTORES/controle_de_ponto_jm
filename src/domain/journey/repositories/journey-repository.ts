import { Journey } from "../entities/journey";

export interface IListJourneysResponse {
    journeys: Journey[];
    count: number;
}

export interface IListJourneysRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

export interface IListUseCaseParams {
    search?: string;
    limit?: number;
    page?: number;
    orderBy?: string;
    orderMode?: string;
}

export abstract class JourneyRepository {
    abstract findById(id: string): Promise<Journey | null>;
    abstract list({
        search,
        limit,
        offset,
    }: IListJourneysRequest): Promise<IListJourneysResponse | null>;
    abstract save(journey: Journey): Promise<void>;
    abstract create(journey: Journey): Promise<void>;
    abstract delete(journey: Journey): Promise<void>;
}

