CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `data` varchar(255),
  `data_keys` varchar(8000)
);

CREATE TABLE `messages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `data` varchar(255),
  `sent` datetime,
  `user_id` int,
  `chat_id` int
);

CREATE TABLE `chats` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(8000)
);

CREATE TABLE `chat_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `chat_id` int,
  `chat_key` varchar(8000)
);