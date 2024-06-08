/*
  Warnings:

  - You are about to drop the column `alt` on the `Workplace` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Workplace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workplace" DROP COLUMN "alt",
DROP COLUMN "category";
