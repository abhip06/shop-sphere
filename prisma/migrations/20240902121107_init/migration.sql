/*
  Warnings:

  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderId_fkey";

-- DropIndex
DROP INDEX "Product_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderStatus" TEXT NOT NULL DEFAULT 'In Progress',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'Unpaid';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderId";
