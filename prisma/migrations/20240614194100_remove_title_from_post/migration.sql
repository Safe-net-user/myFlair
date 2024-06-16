/*
  Warnings:

  - Made the column `updatedAt` on table `AdditionalService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdditionalService" ALTER COLUMN "updatedAt" SET NOT NULL;
