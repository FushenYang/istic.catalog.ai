-- Migration number: 0000 	 2024-04-16T12:52:21.364Z
-- CreateTable
CREATE TABLE "employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visitTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

