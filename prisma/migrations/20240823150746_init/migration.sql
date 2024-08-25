/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Journey` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_journeyId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Journey";

-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "rfid" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rfid" TEXT NOT NULL,
    "clockedIn" TIMESTAMP(3),
    "lunchStart" TIMESTAMP(3),
    "lunchEnd" TIMESTAMP(3),
    "clockedOut" TIMESTAMP(3),
    "hoursWorked" INTEGER NOT NULL,
    "delay" INTEGER NOT NULL,
    "extraHours" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "absenceAllowance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "journey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "start_date_toleranceExtraTime" TEXT NOT NULL,
    "start_date_toleranceDelay" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "end_date_toleranceExtraTime" TEXT NOT NULL,
    "friday_end_date" TEXT NOT NULL,
    "friday_end_date_toleranceExtraTime" TEXT NOT NULL,
    "lunch_time_tolerance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_id_key" ON "employee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_rfid_key" ON "employee"("rfid");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_id_key" ON "attendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "absenceAllowance_id_key" ON "absenceAllowance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "journey_id_key" ON "journey"("id");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absenceAllowance" ADD CONSTRAINT "absenceAllowance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
