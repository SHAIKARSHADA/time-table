-- CreateTable
CREATE TABLE "Periods" (
    "id" TEXT NOT NULL,
    "dayOrder" TEXT NOT NULL,
    "sesssion1" TEXT NOT NULL,
    "sesssion2" TEXT NOT NULL,
    "sesssion3" TEXT NOT NULL,
    "sesssion4" TEXT NOT NULL,
    "timetableId" TEXT NOT NULL,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Periods" ADD CONSTRAINT "Periods_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
