-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ATOM', 'COLLECTION');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "avatar" TEXT,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "serial" INTEGER NOT NULL,
    "path" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),
    "unit" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,
    "cover" TEXT,
    "type" "EventType" NOT NULL DEFAULT 'ATOM',
    "done" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTodo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "eventId" INTEGER,

    CONSTRAINT "EventTodo_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Scene" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT[],
    "description" TEXT,
    "deleted" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worldview" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),
    "cover" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Worldview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "origin" TEXT,
    "layout" JSONB,
    "lock" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "lang" TEXT NOT NULL DEFAULT 'cn',
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "serial" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_serial_projectId_key" ON "Event"("serial", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Chara_name_projectId_key" ON "Chara"("name", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Scene_name_key" ON "Scene"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_projectId_key" ON "Workspace"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_projectId_key" ON "Settings"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTodo" ADD CONSTRAINT "EventTodo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chara" ADD CONSTRAINT "Chara_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worldview" ADD CONSTRAINT "Worldview_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
