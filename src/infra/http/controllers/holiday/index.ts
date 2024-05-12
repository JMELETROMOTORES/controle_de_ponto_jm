import { HolidayPrismaRepository } from "@/infra/database/repositories/prisma-holiday-repository";
import { CreateHolidayUseCase } from "@/domain/holidays/use-cases/create-holiday";
import { CreateHolidayController } from "./create-holiday-controller";
import { ListHolidayUseCase } from "@/domain/holidays/use-cases/fetch-holidays";
import { ListHolidayController } from "./get-holidays-controller";
import { TotalPagesGenerator } from "@/core/pagination/adapters/implementations/TotalPagesGenerator";
import { OffsetGenerator } from "@/core/pagination/adapters/implementations/Offset";
import { DeleteHolidayController } from "./delete-holiday-controller";
import { DeleteHolidayUseCase } from "@/domain/holidays/use-cases/delete-holiday";


const holidayRepository = new HolidayPrismaRepository();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const listHolidayUseCase = new ListHolidayUseCase(
  holidayRepository,
  offsetGenerator,
  totalPagesGenerator,
);

const listHolidayController = new ListHolidayController(listHolidayUseCase);


const createHolidayUseCase = new CreateHolidayUseCase(holidayRepository);
const createHolidayController = new CreateHolidayController(createHolidayUseCase);

const deleteHolidayUseCase = new DeleteHolidayUseCase(holidayRepository);
const deleteHolidayController = new DeleteHolidayController(deleteHolidayUseCase);

export { createHolidayController, listHolidayController, deleteHolidayController};