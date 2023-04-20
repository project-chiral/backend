/*
  Warnings:

  - You are about to drop the column `contentId` on the `EventTodo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventTodo" DROP CONSTRAINT "EventTodo_contentId_fkey";

-- AlterTable
ALTER TABLE "EventTodo" DROP COLUMN "contentId",
ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "EventTodo" ADD CONSTRAINT "EventTodo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
