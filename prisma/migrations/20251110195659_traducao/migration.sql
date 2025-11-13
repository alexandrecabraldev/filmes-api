/*
  Warnings:

  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieActor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Actor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Movie";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MovieActor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Filme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "faixaEtaria" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FilmeAtor" (
    "filmeId" TEXT NOT NULL,
    "atorId" TEXT NOT NULL,

    PRIMARY KEY ("filmeId", "atorId"),
    CONSTRAINT "FilmeAtor_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmeAtor_atorId_fkey" FOREIGN KEY ("atorId") REFERENCES "Ator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Filme_id_key" ON "Filme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ator_id_key" ON "Ator"("id");

-- CreateIndex
CREATE INDEX "FilmeAtor_atorId_idx" ON "FilmeAtor"("atorId");

-- CreateIndex
CREATE INDEX "FilmeAtor_filmeId_idx" ON "FilmeAtor"("filmeId");
