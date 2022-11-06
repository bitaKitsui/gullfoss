-- CreateTable
CREATE TABLE "Cast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CastToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CastToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Cast" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CastToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CastToMovie_AB_unique" ON "_CastToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CastToMovie_B_index" ON "_CastToMovie"("B");
