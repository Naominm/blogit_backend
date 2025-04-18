/*
  Warnings:

  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `secondary_email` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "bio",
DROP COLUMN "image_url",
DROP COLUMN "occupation",
DROP COLUMN "phone_number",
DROP COLUMN "secondary_email";

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_url" TEXT,
    "secondary_email" TEXT,
    "phone_number" TEXT,
    "occupation" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
