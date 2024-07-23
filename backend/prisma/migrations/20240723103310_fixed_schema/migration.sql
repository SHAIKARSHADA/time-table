/*
  Warnings:

  - You are about to drop the column `timetableId` on the `Periods` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Periods" DROP CONSTRAINT "Periods_timetableId_fkey";

-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "timetableId";

-- CreateTable
CREATE TABLE "_PeriodsToTimetable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PeriodsToTimetable_AB_unique" ON "_PeriodsToTimetable"("A", "B");

-- CreateIndex
CREATE INDEX "_PeriodsToTimetable_B_index" ON "_PeriodsToTimetable"("B");

-- AddForeignKey
ALTER TABLE "_PeriodsToTimetable" ADD CONSTRAINT "_PeriodsToTimetable_A_fkey" FOREIGN KEY ("A") REFERENCES "Periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PeriodsToTimetable" ADD CONSTRAINT "_PeriodsToTimetable_B_fkey" FOREIGN KEY ("B") REFERENCES "Timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
