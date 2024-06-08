/*
  Warnings:

  - Made the column `createdAt` on table `Workplace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Workplace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valide` on table `Workplace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Workplace" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "valide" SET NOT NULL,
ALTER COLUMN "valide" SET DEFAULT true;
