/*
  Warnings:

  - You are about to drop the column `path` on the `Worldview` table. All the data in the column will be lost.
  - Added the required column `supId` to the `Worldview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "path",
ADD COLUMN     "supId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Worldview" ADD CONSTRAINT "Worldview_supId_fkey" FOREIGN KEY ("supId") REFERENCES "Worldview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
