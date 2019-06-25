DROP DATABASE IF EXISTS ormDB;
CREATE DATABASE ormDB;

USE ormDB;
select 'create users';
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50)  NOT NULL,
  `email_address` varchar(50) NOT NULL,
  `alias` varchar(50)  NOT NULL,
  `password` varchar(50)  NOT NULL,
  `salt` varchar(50)  NOT NULL,
  `session_token` varchar(50)  NOT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE users
	ADD CONSTRAINT unique_alias UNIQUE KEY(`alias`);
ALTER TABLE users
	ADD CONSTRAINT unique_email UNIQUE KEY(`email_address`);

select 'create messages';
CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message_text` varchar(256),
  `message_time` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `messages` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`user_id`);


select 'create channels';
CREATE TABLE `channels` (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(50),
  PRIMARY KEY (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


select 'create channel_details';
CREATE TABLE `channel_details` (
  `channel_id` int(11),
  `user_id` int(11) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `channel_details` ADD CONSTRAINT `channel_id` FOREIGN KEY (`channel_id`) 
    REFERENCES `channels` (`channel_id`);
ALTER TABLE `channel_details` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`user_id`);


select 'create dm_groups';
CREATE TABLE `dm_groups` (
  `dm_group_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`dm_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


select 'create dm_group_detail';
CREATE TABLE `dm_group_detail` (
  `dm_group_id` int(11),
  `user_id` int(11) DEFAULT NULL
--       PRIMARY KEY (`dm_group_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `dm_group_detail` ADD CONSTRAINT `dm_group_id` FOREIGN KEY (`dm_group_id`) 
    REFERENCES `dm_groups` (`dm_group_id`);
ALTER TABLE `dm_group_detail` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`user_id`);

select 'create direct_message';
CREATE TABLE `direct_message` (
  `dm_group_id` int(11),
  `message_id` int(11)
--       PRIMARY KEY (`dm_group_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `direct_message` ADD CONSTRAINT `dm_group_id` FOREIGN KEY (`dm_group_id`) 
    REFERENCES `dm_group_detail` (`dm_group_id`);
ALTER TABLE `direct_message` ADD CONSTRAINT `message_id` FOREIGN KEY (`message_id`) 
    REFERENCES `messages` (`message_id`);

select 'create channel_message';
CREATE TABLE `channel_message` (
  `channel_id` int(11),
  `message_id` int(11)
--     PRIMARY KEY (`channel_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `channel_message` ADD CONSTRAINT `channel_id` FOREIGN KEY (`channel_id`) 
    REFERENCES `channels` (`channel_id`);
ALTER TABLE `channel_message` ADD CONSTRAINT `message_id` FOREIGN KEY (`message_id`) 
    REFERENCES `messages` (`message_id`);