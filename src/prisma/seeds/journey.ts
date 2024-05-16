import { PrismaClient } from "@prisma/client";

export const seedJourney = async (prisma: PrismaClient) => {
  await prisma.journey.create({
    data: {
      name: "Jornada padrão",
      start_date: "08:00",
      end_date: "18:00",
      start_date_toleranceDelay: "08:10",
      end_date_toleranceExtraTime: "18:10",
      lunch_time_tolerance: 60,
      start_date_toleranceExtraTime: "07:50",
      friday_end_date: "17:00",
      friday_end_date_toleranceExtraTime: "17:10"
    }
  })
}