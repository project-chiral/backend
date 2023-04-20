/*
  Warnings:

  - You are about to drop the column `superId` on the `Scene` table. All the data in the column will be lost.
  - You are about to drop the column `superId` on the `Worldview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sup]` on the table `Scene` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sup]` on the table `Worldview` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Scene" DROP CONSTRAINT "Scene_superId_fkey";

-- DropForeignKey
ALTER TABLE "Worldview" DROP CONSTRAINT "Worldview_superId_fkey";

-- DropIndex
DROP INDEX "Scene_superId_key";

-- DropIndex
DROP INDEX "Worldview_superId_key";

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "superId",
ADD COLUMN     "sup" INTEGER;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "lang" TEXT NOT NULL DEFAULT 'cn';

-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "superId",
ADD COLUMN     "sup" INTEGER,
ADD COLUMN     "worldviewContentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Scene_sup_key" ON "Scene"("sup");

-- CreateIndex
CREATE UNIQUE INDEX "Worldview_sup_key" ON "Worldview"("sup");

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_sup_fkey" FOREIGN KEY ("sup") REFERENCES "Scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worldview" ADD CONSTRAINT "Worldview_sup_fkey" FOREIGN KEY ("sup") REFERENCES "Worldview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
