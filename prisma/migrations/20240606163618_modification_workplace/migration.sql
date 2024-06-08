/*
  Warnings:

  - The primary key for the `Workplace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `weekdays` on the `Workplace` table. All the data in the column will be lost.
  - You are about to drop the column `weekend` on the `Workplace` table. All the data in the column will be lost.
  - The `id` column on the `Workplace` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `category` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationSaturdayEndHour` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationSaturdayEndMinute` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationSaturdayStartHour` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationSaturdayStartMinute` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationWeekEndHour` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationWeekEndMinute` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationWeekStartHour` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationWeekStartMinute` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remote` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saturdayPrice` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Workplace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekPrice` to the `Workplace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workplace" DROP CONSTRAINT "Workplace_pkey",
DROP COLUMN "weekdays",
DROP COLUMN "weekend",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "durationSaturdayEndHour" INTEGER NOT NULL,
ADD COLUMN     "durationSaturdayEndMinute" INTEGER NOT NULL,
ADD COLUMN     "durationSaturdayStartHour" INTEGER NOT NULL,
ADD COLUMN     "durationSaturdayStartMinute" INTEGER NOT NULL,
ADD COLUMN     "durationWeekEndHour" INTEGER NOT NULL,
ADD COLUMN     "durationWeekEndMinute" INTEGER NOT NULL,
ADD COLUMN     "durationWeekStartHour" INTEGER NOT NULL,
ADD COLUMN     "durationWeekStartMinute" INTEGER NOT NULL,
ADD COLUMN     "remote" BOOLEAN NOT NULL,
ADD COLUMN     "saturdayPrice" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "valide" BOOLEAN,
ADD COLUMN     "weekPrice" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ADD CONSTRAINT "Workplace_pkey" PRIMARY KEY ("id");
