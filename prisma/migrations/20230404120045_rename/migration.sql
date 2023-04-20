/*
  Warnings:

  - You are about to drop the column `worldviewContentId` on the `Worldview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "worldviewContentId",
ADD COLUMN     "contentId" INTEGER;
