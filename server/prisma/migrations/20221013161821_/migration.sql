-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_corporationId_fkey";

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
