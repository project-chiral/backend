/*
  Warnings:

  - A unique constraint covering the columns `[name,projectId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Character_projectId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_projectId_key" ON "Character"("name", "projectId");
