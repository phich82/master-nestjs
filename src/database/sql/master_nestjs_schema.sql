create database master_nestjs;

use master_nestjs;

CREATE TABLE IF NOT EXISTS `event` (
  `id` int AUTO_INCREMENT  PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) default NULL,
  `address` varchar(100) NULL,
  `when` TIMESTAMP NOT NULL
)
ENGINE=InnoDB;
