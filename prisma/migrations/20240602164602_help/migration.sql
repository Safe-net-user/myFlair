/*
  Warnings:

  - You are about to drop the `ServiceProfessional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceProfessional" DROP CONSTRAINT "ServiceProfessional_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "service" TEXT;

-- DropTable
DROP TABLE "ServiceProfessional";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_value_key" ON "Service"("value");
