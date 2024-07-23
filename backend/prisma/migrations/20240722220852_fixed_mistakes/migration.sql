/*
  Warnings:

  - You are about to drop the column `sesssion1` on the `Periods` table. All the data in the column will be lost.
  - You are about to drop the column `sesssion2` on the `Periods` table. All the data in the column will be lost.
  - You are about to drop the column `sesssion3` on the `Periods` table. All the data in the column will be lost.
  - You are about to drop the column `sesssion4` on the `Periods` table. All the data in the column will be lost.
  - Added the required column `session1` to the `Periods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session2` to the `Periods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session3` to the `Periods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session4` to the `Periods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "sesssion1",
DROP COLUMN "sesssion2",
DROP COLUMN "sesssion3",
DROP COLUMN "sesssion4",
ADD COLUMN     "session1" TEXT NOT NULL,
ADD COLUMN     "session2" TEXT NOT NULL,
ADD COLUMN     "session3" TEXT NOT NULL,
ADD COLUMN     "session4" TEXT NOT NULL;
