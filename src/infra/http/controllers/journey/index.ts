import { OffsetGenerator } from "@/core/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/core/pagination/adapters/implementations/TotalPagesGenerator";
import { CreateJourneyUseCase } from "@/domain/journey/use-cases/create-journey";

import { JourneyPrismaRepository } from "@/infra/database/repositories/prisma-journey-repository";

import { DeleteJourneyUseCase } from "@/domain/journey/use-cases/delete-journey";
import { EditJourneyUseCase } from "@/domain/journey/use-cases/edit-journey";
import { ListJourneyUseCase } from "@/domain/journey/use-cases/fetch-journey";
import { CreateJourneyController } from "./create-journey-controller";
import { DeleteJourneyController } from "./delete-journey-controller";
import { EditJourneyController } from "./edit-journey-controller";
import { ListJourneyController } from "./fetch-journey-controller";

// all
const journeyRepository = new JourneyPrismaRepository();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();

// create Journey
const createJourneyUseCase = new CreateJourneyUseCase(journeyRepository);

const createJourneyController = new CreateJourneyController(
    createJourneyUseCase,
);

// list journeys
const listJourneysUseCase = new ListJourneyUseCase(
    journeyRepository,
    offsetGenerator,
    totalPagesGenerator,
);
const listJourneysController = new ListJourneyController(listJourneysUseCase);

// edit journey

const editJourneyUseCase = new EditJourneyUseCase(journeyRepository);
const editJourneyController = new EditJourneyController(editJourneyUseCase);

// delete journey

const deleteJourneyUseCase = new DeleteJourneyUseCase(journeyRepository);
const deleteJourneyController = new DeleteJourneyController(
    deleteJourneyUseCase,
);

export {
    createJourneyController,
    deleteJourneyController,
    editJourneyController,
    listJourneysController,
};

