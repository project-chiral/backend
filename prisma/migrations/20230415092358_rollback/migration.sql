/*
  Warnings:

  - You are about to drop the column `supId` on the `Worldview` table. All the data in the column will be lost.
  - Added the required column `path` to the `Worldview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Worldview" DROP CONSTRAINT "Worldview_supId_fkey";

-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "supId",
ADD COLUMN     "path" TEXT NOT NULL;
