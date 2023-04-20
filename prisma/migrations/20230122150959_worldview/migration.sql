/*
  Warnings:

  - You are about to drop the column `content` on the `EventTodo` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `EventTodo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EventTodo` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `EventTodo` table. All the data in the column will be lost.
  - You are about to drop the `Backdrop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BackdropToProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToScence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToScence` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `contentId` to the `EventTodo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `EventTodo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventTodo" DROP CONSTRAINT "EventTodo_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Scence" DROP CONSTRAINT "Scence_superId_fkey";

-- DropForeignKey
ALTER TABLE "_BackdropToProject" DROP CONSTRAINT "_BackdropToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_BackdropToProject" DROP CONSTRAINT "_BackdropToProject_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToScence" DROP CONSTRAINT "_EventToScence_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToScence" DROP CONSTRAINT "_EventToScence_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToScence" DROP CONSTRAINT "_ProjectToScence_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToScence" DROP CONSTRAINT "_ProjectToScence_B_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "color" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EventTodo" DROP COLUMN "content",
DROP COLUMN "eventId",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Backdrop";

-- DropTable
DROP TABLE "Scence";

-- DropTable
DROP TABLE "_BackdropToProject";

-- DropTable
DROP TABLE "_EventToScence";

-- DropTable
DROP TABLE "_ProjectToScence";

-- CreateTable
CREATE TABLE "Scene" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT[],
    "description" TEXT,
    "unit" INTEGER,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "superId" INTEGER,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worldview" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "superId" INTEGER,

    CONSTRAINT "Worldview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToWorldview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Scene_superId_key" ON "Scene"("superId");

-- CreateIndex
CREATE UNIQUE INDEX "Worldview_superId_key" ON "Worldview"("superId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToScene_AB_unique" ON "_EventToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToScene_B_index" ON "_EventToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToScene_AB_unique" ON "_ProjectToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToScene_B_index" ON "_ProjectToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToWorldview_AB_unique" ON "_ProjectToWorldview"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToWorldview_B_index" ON "_ProjectToWorldview"("B");

-- AddForeignKey
ALTER TABLE "EventTodo" ADD CONSTRAINT "EventTodo_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "EventContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_superId_fkey" FOREIGN KEY ("superId") REFERENCES "Scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worldview" ADD CONSTRAINT "Worldview_superId_fkey" FOREIGN KEY ("superId") REFERENCES "Worldview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToScene" ADD CONSTRAINT "_EventToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToScene" ADD CONSTRAINT "_EventToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToScene" ADD CONSTRAINT "_ProjectToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToScene" ADD CONSTRAINT "_ProjectToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToWorldview" ADD CONSTRAINT "_ProjectToWorldview_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToWorldview" ADD CONSTRAINT "_ProjectToWorldview_B_fkey" FOREIGN KEY ("B") REFERENCES "Worldview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
