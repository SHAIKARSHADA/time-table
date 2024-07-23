-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_dayOrder_fkey";

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_dayOrder_fkey" FOREIGN KEY ("dayOrder") REFERENCES "Periods"("dayOrder") ON DELETE RESTRICT ON UPDATE CASCADE;
