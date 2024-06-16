/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "WorkPlace" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationWeekStartHour" INTEGER NOT NULL,
    "durationWeekStartMinute" INTEGER NOT NULL,
    "durationWeekEndHour" INTEGER NOT NULL,
    "durationWeekEndMinute" INTEGER NOT NULL,
    "durationSaturdayStartHour" INTEGER NOT NULL,
    "durationSaturdayStartMinute" INTEGER NOT NULL,
    "durationSaturdayEndHour" INTEGER NOT NULL,
    "durationSaturdayEndMinute" INTEGER NOT NULL,
    "weekPrice" TEXT NOT NULL,
    "saturdayPrice" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "valide" BOOLEAN NOT NULL DEFAULT true,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idPost" TEXT NOT NULL,

    CONSTRAINT "WorkPlace_pkey" PRIMARY KEY ("idPost")
);
