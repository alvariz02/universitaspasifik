-- CreateTable
CREATE TABLE "Journal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "abstract" TEXT,
    "authors" TEXT NOT NULL,
    "authorAffiliation" TEXT,
    "keywords" TEXT,
    "category" TEXT,
    "subject" TEXT,
    "language" TEXT NOT NULL DEFAULT 'id',
    "pages" TEXT,
    "volume" TEXT,
    "issue" TEXT,
    "year" INTEGER,
    "publishedDate" DATETIME,
    "doi" TEXT,
    "issn" TEXT,
    "pdfUrl" TEXT,
    "pdfSize" INTEGER,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "isOpenAccess" BOOLEAN NOT NULL DEFAULT true,
    "isPeerReviewed" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "facultyId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Journal_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Journal_slug_key" ON "Journal"("slug");
