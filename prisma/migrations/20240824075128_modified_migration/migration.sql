/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `picture` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_author_key" ON "Author"("author");
