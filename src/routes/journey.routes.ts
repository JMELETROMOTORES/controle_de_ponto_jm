import {
    createJourneyController,
    deleteJourneyController,
    editJourneyController,
    listJourneysController,
} from "@/infra/http/controllers/journey";
import { Router } from "express";

const JourneyRoutes = Router();

JourneyRoutes.post("/", (request, response, next) => {
    return createJourneyController.handle(request, response, next);
});

JourneyRoutes.delete("/:id", (request, response, next) => {
    return deleteJourneyController.handle(request, response, next);
});

JourneyRoutes.get("/", (request, response, next) => {
    return listJourneysController.handle(request, response, next);
});

JourneyRoutes.put("/:id", (request, response, next) => {
    return editJourneyController.handle(request, response, next);
});

export { JourneyRoutes };

