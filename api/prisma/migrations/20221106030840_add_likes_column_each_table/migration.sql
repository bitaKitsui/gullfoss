-- CreateTable
CREATE TABLE "_CrewToLike" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CrewToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Crew" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CrewToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "Like" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CastToLike" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CastToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Cast" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CastToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "Like" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CrewToLike_AB_unique" ON "_CrewToLike"("A", "B");

-- CreateIndex
CREATE INDEX "_CrewToLike_B_index" ON "_CrewToLike"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CastToLike_AB_unique" ON "_CastToLike"("A", "B");

-- CreateIndex
CREATE INDEX "_CastToLike_B_index" ON "_CastToLike"("B");
