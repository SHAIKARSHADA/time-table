/*
  Warnings:

  - You are about to drop the column `periodsId` on the `Timetable` table. All the data in the column will be lost.
  - Made the column `dayOrder` on table `Timetable` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_periodsId_fkey";

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "periodsId",
ALTER COLUMN "dayOrder" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_dayOrder_fkey" FOREIGN KEY ("dayOrder") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
