-- CreateTable
CREATE TABLE `participants` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `is_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `is_owner` BOOLEAN NOT NULL DEFAULT false,
    `trip_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `participants` ADD CONSTRAINT `participants_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
