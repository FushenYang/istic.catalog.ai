-- Migration number: 0002 	 2024-04-16T08:57:18.200Z
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN "ip" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL
);
INSERT INTO "new_employees" ("department", "email", "id", "name") SELECT "department", "email", "id", "name" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

