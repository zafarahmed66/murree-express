/*
  Warnings:

  - You are about to drop the `_AccountToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccountToUser" DROP CONSTRAINT "_AccountToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToUser" DROP CONSTRAINT "_AccountToUser_B_fkey";

-- DropTable
DROP TABLE "_AccountToUser";

-- CreateTable
CREATE TABLE "_UserAccounts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserAccounts_AB_unique" ON "_UserAccounts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAccounts_B_index" ON "_UserAccounts"("B");

-- AddForeignKey
ALTER TABLE "_UserAccounts" ADD CONSTRAINT "_UserAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAccounts" ADD CONSTRAINT "_UserAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
