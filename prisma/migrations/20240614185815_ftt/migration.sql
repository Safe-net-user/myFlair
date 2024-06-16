-- AlterTable
ALTER TABLE "AdditionalService" ALTER COLUMN "sales" DROP NOT NULL;

-- DropEnum
DROP TYPE "AdditionalServiceType";
