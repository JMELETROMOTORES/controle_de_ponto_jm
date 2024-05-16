/*
  Warnings:

  - Added the required column `end_date_toleranceExtraTime` to the `Journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date_toleranceDelay` to the `Journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date_toleranceExtraTime` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "paid" BOOLEAN,
ALTER COLUMN "clockedIn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "end_date_toleranceExtraTime" TEXT NOT NULL,
ADD COLUMN     "start_date_toleranceDelay" TEXT NOT NULL,
ADD COLUMN     "start_date_toleranceExtraTime" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "holiday" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "holiday_id_key" ON "holiday"("id");
