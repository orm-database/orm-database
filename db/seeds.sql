use ormDB;
INSERT INTO USERS (first_name, last_name, email_address, alias, password, salt)
	VALUES('Nigel', 'Phillips', 'nigel@email.com', 'nigel', 'nigel', 'salt'),
	('Justin', 'Louie', 'justin@email.com', 'justin', 'justin', 'salt'),
	('Daniel', 'Sochor', 'daniel@email.com', 'daniel', 'daniel', 'salt'),
	('Chris', 'Burke', 'chris@email.com', 'chris', 'chris', 'salt');

INSERT INTO channels
	(channel_name) VALUES('Project Team');

INSERT INTO channel_user (channel_id, user_id)
	VALUES(1, 1),
	(1, 2);

INSERT INTO messages (user_id, message_text)
	VALUES(1, 'Hello Project Team');

INSERT INTO channel_message (channel_id, message_id) VALUES(1, 1);    


SELECT * FROM channel_message
	JOIN messages
		ON channel_message.message_id = messages.message_id
	JOIN channel_user
		ON channel_message.channel_id = channel_user.channel_id
	JOIN users
		ON users.user_id = channel_user.user_id;