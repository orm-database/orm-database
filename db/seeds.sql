INSERT INTO USERS (first_name, last_name, email_address, alias, password, salt, session_token)
	VALUES('Nigel', 'Phillips', 'nigel@email.com', 'nigel', 'nigel', 'salt', '34ss3f562g'),
	('Justin', 'Louie', 'justin@email.com', 'justin', 'justin', 'salt', '34ss3f562g'),
	('Daniel', 'Sochor', 'daniel@email.com', 'daniel', 'daniel', 'salt', '34ss3f562g'),
	('Chris', 'Burke', 'chris@email.com', 'chris', 'chris', 'salt', '34ss3f562g');

INSERT INTO channels
	(channel_name) VALUES('Project Team');

INSERT INTO channel_details (channel_id, user_id)
	VALUES(1, 1),
	(1, 2);

INSERT INTO messages (user_id, message_text)
	VALUES(1, 'Hello Project Team');

INSERT INTO channel_message VALUES(1, 1);    


SELECT * FROM channel_message
	JOIN messages
		ON channel_message.message_id = messages.message_id
	JOIN channel_details
		ON channel_message.channel_id = channel_details.channel_id
	JOIN users
		ON users.user_id = channel_details.user_id;