-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `birthday` VARCHAR(191) NOT NULL,
    `prefecture` ENUM('HOKKAIDO', 'AOMORI', 'IWATE', 'MIYAGI', 'AKITA', 'YAMAGATA', 'FUKUSHIMA', 'IBARAKI', 'TOCHIGI', 'GUNMA', 'SAITAMA', 'CHIBA', 'TOKYO', 'KANAGAWA', 'NIIGATA', 'TOYAMA', 'ISHIKAWA', 'FUKUI', 'YAMANASHI', 'NAGANO', 'GIFU', 'SHIZUOKA', 'AICHI', 'MIE', 'SHIGA', 'KYOTO', 'OSAKA', 'HYOGO', 'NARA', 'WAKAYAMA', 'TOTTORI', 'SHIMANE', 'OKAYAMA', 'HIROSHIMA', 'YAMAGUCHI', 'TOKUSHIMA', 'KAGAWA', 'EHIME', 'KOCHI', 'FUKUOKA', 'SAGA', 'NAGASAKI', 'KUMAMOTO', 'OITA', 'MIYAZAKI', 'KAGOSHIMA', 'OKINAWA') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `height` INTEGER NULL,
    `weight` ENUM('THIN', 'LITTLE_THIN', 'NORMAL', 'LITTLE_FAT', 'FAT') NULL,
    `education` ENUM('ELEMENTARY_SCHOOL', 'JUNIOR_HIGH_SCOOL', 'HIGH_SCHOOL', 'UNIVERSITY', 'OTHER') NULL,
    `income` ENUM('LOWER_THAN_300', 'BETWEEN_300_AND_500', 'BETWEEN_500_AND_700', 'BETWEEN_700_AND_1000', 'OVER_1000') NULL,
    `holiday` ENUM('EVERYDAY', 'WEEKDAY', 'WEEKEND', 'NO_HOLIDAY', 'DONT_KNOW') NULL,
    `marry_intention` ENUM('WANT_TO_MARRY', 'IF_I_MEET_THE_RIGHT_PERSON', 'NO_PLAN') NULL,

    UNIQUE INDEX `Profile_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatePlan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date_plan_categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatePlanCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hobby` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `hobby_categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HobbyCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `talk_id` VARCHAR(191) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `attachment` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Talk` (
    `id` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DatePlanToProfile` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DatePlanToProfile_AB_unique`(`A`, `B`),
    INDEX `_DatePlanToProfile_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HobbyToProfile` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_HobbyToProfile_AB_unique`(`A`, `B`),
    INDEX `_HobbyToProfile_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TalkToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TalkToUser_AB_unique`(`A`, `B`),
    INDEX `_TalkToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatePlan` ADD CONSTRAINT `DatePlan_date_plan_categoryId_fkey` FOREIGN KEY (`date_plan_categoryId`) REFERENCES `DatePlanCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hobby` ADD CONSTRAINT `Hobby_hobby_categoryId_fkey` FOREIGN KEY (`hobby_categoryId`) REFERENCES `HobbyCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_talk_id_fkey` FOREIGN KEY (`talk_id`) REFERENCES `Talk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatePlanToProfile` ADD CONSTRAINT `_DatePlanToProfile_A_fkey` FOREIGN KEY (`A`) REFERENCES `DatePlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatePlanToProfile` ADD CONSTRAINT `_DatePlanToProfile_B_fkey` FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HobbyToProfile` ADD CONSTRAINT `_HobbyToProfile_A_fkey` FOREIGN KEY (`A`) REFERENCES `Hobby`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HobbyToProfile` ADD CONSTRAINT `_HobbyToProfile_B_fkey` FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TalkToUser` ADD CONSTRAINT `_TalkToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Talk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TalkToUser` ADD CONSTRAINT `_TalkToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
