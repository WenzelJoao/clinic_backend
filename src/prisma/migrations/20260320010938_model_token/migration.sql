/*
  Warnings:

  - You are about to drop the column `password` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `senha` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tipo_token" AS ENUM ('ACESSO', 'REFRESH');

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "password",
ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "tipo" "Tipo_token" NOT NULL DEFAULT 'ACESSO',
    "revogado" BOOLEAN NOT NULL DEFAULT false,
    "expira_em" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
