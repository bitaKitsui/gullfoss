/*
  Warnings:

  - You are about to drop the `_CrewToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CrewToMovie";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CrewsOnMovies" (
    "movieId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("movieId", "crewId"),
    CONSTRAINT "CrewsOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CrewsOnMovies_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
