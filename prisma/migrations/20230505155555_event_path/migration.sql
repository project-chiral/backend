-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "path" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Worldview" ALTER COLUMN "path" SET DEFAULT '';
