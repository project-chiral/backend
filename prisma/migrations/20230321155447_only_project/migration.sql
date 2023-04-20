/*
  Warnings:

  - You are about to drop the column `content` on the `Worldview` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Worldview` table. All the data in the column will be lost.
  - You are about to drop the `_CharacterToProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToScene` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToWorldview` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `Scene` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `Worldview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Scene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Worldview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CharacterToProject" DROP CONSTRAINT "_CharacterToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToProject" DROP CONSTRAINT "_CharacterToProject_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToScene" DROP CONSTRAINT "_ProjectToScene_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToScene" DROP CONSTRAINT "_ProjectToScene_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToWorldview" DROP CONSTRAINT "_ProjectToWorldview_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToWorldview" DROP CONSTRAINT "_ProjectToWorldview_B_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "content",
DROP COLUMN "description",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CharacterToProject";

-- DropTable
DROP TABLE "_ProjectToScene";

-- DropTable
DROP TABLE "_ProjectToWorldview";

-- CreateTable
CREATE TABLE "WorldviewContent" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cover" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "worldviewId" INTEGER NOT NULL,

    CONSTRAINT "WorldviewContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldviewContent_worldviewId_key" ON "WorldviewContent"("worldviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_projectId_key" ON "Character"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Scene_projectId_key" ON "Scene"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Worldview_projectId_key" ON "Worldview"("projectId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worldview" ADD CONSTRAINT "Worldview_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldviewContent" ADD CONSTRAINT "WorldviewContent_worldviewId_fkey" FOREIGN KEY ("worldviewId") REFERENCES "Worldview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
