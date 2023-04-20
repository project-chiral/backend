-- DropForeignKey
ALTER TABLE "Worldview" DROP CONSTRAINT "Worldview_supId_fkey";

-- AlterTable
ALTER TABLE "Worldview" ALTER COLUMN "supId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Worldview" ADD CONSTRAINT "Worldview_supId_fkey" FOREIGN KEY ("supId") REFERENCES "Worldview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
