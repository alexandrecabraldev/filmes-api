/*
  Warnings:

  - You are about to drop the `FilmeAtor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FilmeAtor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_AtorToFilme" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AtorToFilme_A_fkey" FOREIGN KEY ("A") REFERENCES "Ator" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AtorToFilme_B_fkey" FOREIGN KEY ("B") REFERENCES "Filme" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AtorToFilme_AB_unique" ON "_AtorToFilme"("A", "B");

-- CreateIndex
CREATE INDEX "_AtorToFilme_B_index" ON "_AtorToFilme"("B");
