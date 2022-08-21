/*
  Warnings:

  - The primary key for the `UnreadMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `count` on the `UnreadMessage` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UnreadMessage` table. All the data in the column will be lost.
  - Added the required column `message_id` to the `UnreadMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UnreadMessage` DROP PRIMARY KEY,
    DROP COLUMN `count`,
    DROP COLUMN `id`,
    ADD COLUMN `message_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `talk_id`);

-- AddForeignKey
ALTER TABLE `UnreadMessage` ADD CONSTRAINT `UnreadMessage_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
