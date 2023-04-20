/*
  Warnings:

  - A unique constraint covering the columns `[serial,projectId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_serial_projectId_key" ON "Event"("serial", "projectId");
