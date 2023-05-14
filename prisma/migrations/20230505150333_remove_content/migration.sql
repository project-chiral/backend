/*
  Warnings:

  - You are about to drop the column `contentId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `Worldview` table. All the data in the column will be lost.
  - You are about to drop the `EventContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorldviewContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventContent" DROP CONSTRAINT "EventContent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "WorldviewContent" DROP CONSTRAINT "WorldviewContent_worldviewId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "contentId",
ADD COLUMN     "cover" TEXT;

-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "contentId",
ADD COLUMN     "cover" TEXT;

-- DropTable
DROP TABLE "EventContent";

-- DropTable
DROP TABLE "WorldviewContent";
