/*
  Warnings:

  - You are about to drop the `_ListToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ListToMovie";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ListsOnMovies" (
    "movieId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,

    PRIMARY KEY ("movieId", "listId"),
    CONSTRAINT "ListsOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListsOnMovies_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
