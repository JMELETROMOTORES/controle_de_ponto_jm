import { HolidayPrismaRepository } from "@/infra/database/repositories/prisma-holiday-repository";
import { CreateHolidayUseCase } from "@/domain/holidays/use-cases/create-holiday";
import { CreateHolidayController } from "./create-holiday-controller";


const holidayRepository = new HolidayPrismaRepository();
const createHolidayUseCase = new CreateHolidayUseCase(holidayRepository);
const createHolidayController = new CreateHolidayController(createHolidayUseCase);

export { createHolidayController };