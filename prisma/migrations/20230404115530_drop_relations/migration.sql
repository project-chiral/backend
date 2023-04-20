/*
  Warnings:

  - You are about to drop the column `sup` on the `Scene` table. All the data in the column will be lost.
  - You are about to drop the `_CharacterToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToScene` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_contains` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Scene" DROP CONSTRAINT "Scene_sup_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToEvent" DROP CONSTRAINT "_CharacterToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToEvent" DROP CONSTRAINT "_CharacterToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToScene" DROP CONSTRAINT "_EventToScene_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToScene" DROP CONSTRAINT "_EventToScene_B_fkey";

-- DropForeignKey
ALTER TABLE "_contains" DROP CONSTRAINT "_contains_A_fkey";

-- DropForeignKey
ALTER TABLE "_contains" DROP CONSTRAINT "_contains_B_fkey";

-- DropIndex
DROP INDEX "Scene_sup_key";

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "sup";

-- DropTable
DROP TABLE "_CharacterToEvent";

-- DropTable
DROP TABLE "_EventToScene";

-- DropTable
DROP TABLE "_contains";
