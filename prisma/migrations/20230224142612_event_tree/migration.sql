-- CreateTable
CREATE TABLE "_contains" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_contains_AB_unique" ON "_contains"("A", "B");

-- CreateIndex
CREATE INDEX "_contains_B_index" ON "_contains"("B");

-- AddForeignKey
ALTER TABLE "_contains" ADD CONSTRAINT "_contains_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contains" ADD CONSTRAINT "_contains_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
