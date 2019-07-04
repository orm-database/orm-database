DROP DATABASE IF EXISTS ormDB;
CREATE DATABASE ormDB;

USE ormDB;
select 'create users - begin';
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50)  NOT NULL,
  `email_address` varchar(50) NOT NULL,
  `alias` varchar(50)  NOT NULL,
  `password` varchar(50)  NOT NULL,
  `salt` varchar(50)  NOT NULL,
  `session_token` varchar(50),
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE users
	ADD CONSTRAINT unique_alias UNIQUE KEY(`alias`);
ALTER TABLE users
	ADD CONSTRAINT unique_email UNIQUE KEY(`email_address`);
select 'create users - end';


select 'create messages - begin';
CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message_text` varchar(4000) NOT NULL,
  `message_time` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `messages` ADD CONSTRAINT `fk_message_users_user_id` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`user_id`);
select 'create messages - end';


select 'create channels - begin';
CREATE TABLE `channels` (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(50) NOT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE channels
	ADD CONSTRAINT unique_channel_name UNIQUE KEY(`channel_name`);
select 'create channels - end';


select 'create channel_user - begin';
CREATE TABLE `channel_user` (
  `channel_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`channel_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `channel_user` ADD CONSTRAINT `fk_channel_user_channels_channel_id` FOREIGN KEY (`channel_id`) 
    REFERENCES `channels` (`channel_id`);
ALTER TABLE `channel_user` ADD CONSTRAINT `fk_channel_user_users_user_id` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`user_id`);
select 'create channel_user - end';


select 'create direct_groups - begin';
CREATE TABLE `direct_groups` (
  `direct_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
 PRIMARY KEY (`direct_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create direct_groups - end';


select 'create direct_group_user - begin';
CREATE TABLE `direct_group_user` (
  `direct_group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(`direct_group_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `direct_group_user` ADD CONSTRAINT `fk_direct_group_group_id` FOREIGN KEY (`direct_group_id`) 
    REFERENCES `direct_groups` (`direct_group_id`);
ALTER TABLE `direct_group_user` ADD CONSTRAINT `fk_direct_group_user_user_id` FOREIGN KEY (`user_id`) 
    REFERENCES `users` (`user_id`);
select 'create direct_group_user - end';


select 'create direct_message - begin';
CREATE TABLE `direct_group_message` (
  `direct_group_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(`direct_group_id`, `message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `direct_group_message` ADD CONSTRAINT `fk_group_message_user` FOREIGN KEY (`direct_group_id`) 
    REFERENCES `direct_group_user` (`direct_group_id`);
ALTER TABLE `direct_group_message` ADD CONSTRAINT `fk_direct_group_message` FOREIGN KEY (`message_id`) 
    REFERENCES `messages` (`message_id`);
select 'create direct_message - end';


select 'create channel_message - begin';
CREATE TABLE `channel_message` (
  `channel_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(`channel_id`, `message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `channel_message` ADD CONSTRAINT `fk_channel_message_channel_id` FOREIGN KEY (`channel_id`) 
    REFERENCES `channels` (`channel_id`);
ALTER TABLE `channel_message` ADD CONSTRAINT `fk_channel_message_message_message_id` FOREIGN KEY (`message_id`) 
    REFERENCES `messages` (`message_id`);
select 'create channel_message - end';