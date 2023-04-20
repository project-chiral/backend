/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Character` table. All the data in the column will be lost.
  - The `deleted` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `Event` table. All the data in the column will be lost.
  - The `deleted` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `Project` table. All the data in the column will be lost.
  - The `deleted` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `Scene` table. All the data in the column will be lost.
  - The `deleted` column on the `Scene` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `Worldview` table. All the data in the column will be lost.
  - The `deleted` column on the `Worldview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "deletedAt",
DROP COLUMN "deleted",
ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "deletedAt",
DROP COLUMN "deleted",
ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "deletedAt",
DROP COLUMN "deleted",
ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "deletedAt",
DROP COLUMN "deleted",
ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Worldview" DROP COLUMN "deletedAt",
DROP COLUMN "deleted",
ADD COLUMN     "deleted" TIMESTAMP(3);
