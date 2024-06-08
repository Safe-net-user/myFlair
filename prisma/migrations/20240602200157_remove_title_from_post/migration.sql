/*
  Warnings:

  - You are about to drop the column `value` on the `Service` table. All the data in the column will be lost.
  - Added the required column `category` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domicile` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Service_value_key";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "value",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "domicile" BOOLEAN NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
