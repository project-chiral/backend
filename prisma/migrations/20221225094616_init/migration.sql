-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ATOM', 'COLLECTION');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "unit" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#93c5fd',
    "type" "EventType" NOT NULL DEFAULT 'ATOM',
    "contentId" INTEGER,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventContent" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTodo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventTodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT[],
    "description" TEXT,
    "unit" INTEGER,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scence" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT[],
    "description" TEXT,
    "unit" INTEGER,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "superId" INTEGER,

    CONSTRAINT "Scence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backdrop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Backdrop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "layout" JSONB NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToScence" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BackdropToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToScence" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventContent_eventId_key" ON "EventContent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Scence_superId_key" ON "Scence"("superId");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_projectId_key" ON "Workspace"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_projectId_key" ON "Settings"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToScence_AB_unique" ON "_EventToScence"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToScence_B_index" ON "_EventToScence"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToEvent_AB_unique" ON "_CharacterToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToEvent_B_index" ON "_CharacterToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToProject_AB_unique" ON "_CharacterToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToProject_B_index" ON "_CharacterToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BackdropToProject_AB_unique" ON "_BackdropToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_BackdropToProject_B_index" ON "_BackdropToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToScence_AB_unique" ON "_ProjectToScence"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToScence_B_index" ON "_ProjectToScence"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContent" ADD CONSTRAINT "EventContent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTodo" ADD CONSTRAINT "EventTodo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scence" ADD CONSTRAINT "Scence_superId_fkey" FOREIGN KEY ("superId") REFERENCES "Scence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToScence" ADD CONSTRAINT "_EventToScence_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToScence" ADD CONSTRAINT "_EventToScence_B_fkey" FOREIGN KEY ("B") REFERENCES "Scence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEvent" ADD CONSTRAINT "_CharacterToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEvent" ADD CONSTRAINT "_CharacterToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToProject" ADD CONSTRAINT "_CharacterToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToProject" ADD CONSTRAINT "_CharacterToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BackdropToProject" ADD CONSTRAINT "_BackdropToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Backdrop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BackdropToProject" ADD CONSTRAINT "_BackdropToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToScence" ADD CONSTRAINT "_ProjectToScence_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToScence" ADD CONSTRAINT "_ProjectToScence_B_fkey" FOREIGN KEY ("B") REFERENCES "Scence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
