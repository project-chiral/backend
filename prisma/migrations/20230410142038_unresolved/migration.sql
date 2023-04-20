/*
  Warnings:

  - You are about to drop the column `charaOptions` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "charaOptions",
ADD COLUMN     "unresolved" TEXT NOT NULL DEFAULT '';
