/*
  Warnings:

  - You are about to drop the `_PeriodsToTimetable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dayOrder]` on the table `Periods` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `periodsId` to the `Timetable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PeriodsToTimetable" DROP CONSTRAINT "_PeriodsToTimetable_A_fkey";

-- DropForeignKey
ALTER TABLE "_PeriodsToTimetable" DROP CONSTRAINT "_PeriodsToTimetable_B_fkey";

-- AlterTable
ALTER TABLE "Timetable" ADD COLUMN     "periodsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PeriodsToTimetable";

-- CreateIndex
CREATE UNIQUE INDEX "Periods_dayOrder_key" ON "Periods"("dayOrder");

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_periodsId_fkey" FOREIGN KEY ("periodsId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
