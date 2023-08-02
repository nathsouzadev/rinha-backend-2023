-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "apelido" VARCHAR(32) NOT NULL,
    "nascimento" TEXT NOT NULL,
    "stack" TEXT[],

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_apelido_key" ON "Person"("apelido");
