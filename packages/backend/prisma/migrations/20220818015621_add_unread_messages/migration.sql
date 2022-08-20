-- CreateTable
CREATE TABLE `UnreadMessage` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `talk_id` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UnreadMessage` ADD CONSTRAINT `UnreadMessage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnreadMessage` ADD CONSTRAINT `UnreadMessage_talk_id_fkey` FOREIGN KEY (`talk_id`) REFERENCES `Talk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
