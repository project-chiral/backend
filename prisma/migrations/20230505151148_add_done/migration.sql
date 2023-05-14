/*
  Warnings:

  - You are about to drop the column `unresolved` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "unresolved";

-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Worldview" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
