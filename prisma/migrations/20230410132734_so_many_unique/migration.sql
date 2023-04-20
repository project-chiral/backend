/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Scene` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Worldview` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Character_projectId_key";

-- DropIndex
DROP INDEX "Scene_projectId_key";

-- DropIndex
DROP INDEX "Worldview_projectId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Scene_name_key" ON "Scene"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Worldview_name_key" ON "Worldview"("name");
