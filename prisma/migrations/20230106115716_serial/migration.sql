/*
  Warnings:

  - Added the required column `serial` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "serial" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "serial" INTEGER NOT NULL DEFAULT 0;
