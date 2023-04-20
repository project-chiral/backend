/*
  Warnings:

  - You are about to drop the column `images` on the `Worldview` table. All the data in the column will be lost.
  - You are about to drop the column `sup` on the `Worldview` table. All the data in the column will be lost.
  - Added the required column `path` to the `Worldview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Worldview" DROP CONSTRAINT "Worldview_sup_fkey";

-- DropIndex
DROP INDEX "Worldview_name_key";

-- DropIndex
DROP INDEX "Worldview_sup_key";

-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "images",
DROP COLUMN "sup",
ADD COLUMN     "path" TEXT NOT NULL;
