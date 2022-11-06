/*
  Warnings:

  - You are about to drop the `_CastToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CastToMovie";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CastsOnMovies" (
    "movieId" TEXT NOT NULL,
    "castId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("movieId", "castId"),
    CONSTRAINT "CastsOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CastsOnMovies_castId_fkey" FOREIGN KEY ("castId") REFERENCES "Cast" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
