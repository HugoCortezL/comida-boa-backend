/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `cousines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `materials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `portions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `utensils` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categories_name_key` ON `categories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `cousines_name_key` ON `cousines`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `materials_name_key` ON `materials`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `portions_name_key` ON `portions`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `recipes_name_key` ON `recipes`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `utensils_name_key` ON `utensils`(`name`);
