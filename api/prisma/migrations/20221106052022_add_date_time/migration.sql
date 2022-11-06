/*
  Warnings:

  - Added the required column `updatedAt` to the `ListsOnMovies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListsOnMovies" (
    "movieId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("movieId", "listId"),
    CONSTRAINT "ListsOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListsOnMovies_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListsOnMovies" ("listId", "movieId") SELECT "listId", "movieId" FROM "ListsOnMovies";
DROP TABLE "ListsOnMovies";
ALTER TABLE "new_ListsOnMovies" RENAME TO "ListsOnMovies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
