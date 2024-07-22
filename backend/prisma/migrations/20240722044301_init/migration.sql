-- CreateTable
CREATE TABLE "Timetable" (
    "id" TEXT NOT NULL,
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "date" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "dayOrder" TEXT NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);
