/*
  Warnings:

  - You are about to drop the `sais` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `display_username` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "display_username" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "sais";
