-- CreateTable
CREATE TABLE `activities` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `occurs_at` DATETIME(3) NOT NULL,
    `trip_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `links` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `trip_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `links` ADD CONSTRAINT `links_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
