-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_LikeToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LikeToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Like" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LikeToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToMovie_AB_unique" ON "_LikeToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToMovie_B_index" ON "_LikeToMovie"("B");
