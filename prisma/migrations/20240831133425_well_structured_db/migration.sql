/*
  Warnings:

  - You are about to drop the column `author` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `quote` on the `Quote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `quoteName` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_author_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "author",
DROP COLUMN "picture",
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "quote",
ADD COLUMN     "quoteName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
