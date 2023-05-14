/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_projectId_fkey";

-- DropTable
DROP TABLE "Character";

-- CreateTable
CREATE TABLE "Chara" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT[],
    "description" TEXT,
    "avatar" TEXT,
    "deleted" TIMESTAMP(3),
    "unit" INTEGER,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Chara_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chara_name_key" ON "Chara"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chara_name_projectId_key" ON "Chara"("name", "projectId");

-- AddForeignKey
ALTER TABLE "Chara" ADD CONSTRAINT "Chara_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
