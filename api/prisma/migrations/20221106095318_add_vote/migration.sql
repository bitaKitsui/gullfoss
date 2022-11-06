-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "isWatched" BOOLEAN NOT NULL,
    "vote" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Movie" ("createdAt", "id", "isWatched", "runtime", "title", "updatedAt", "year") SELECT "createdAt", "id", "isWatched", "runtime", "title", "updatedAt", "year" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
