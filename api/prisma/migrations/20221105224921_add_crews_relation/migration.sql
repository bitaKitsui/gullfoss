-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Crew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "movieId" TEXT,
    CONSTRAINT "Crew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Crew" ("createdAt", "id", "job", "name", "updatedAt") SELECT "createdAt", "id", "job", "name", "updatedAt" FROM "Crew";
DROP TABLE "Crew";
ALTER TABLE "new_Crew" RENAME TO "Crew";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
