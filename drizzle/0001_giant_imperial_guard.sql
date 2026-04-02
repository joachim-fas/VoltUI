CREATE TABLE `github_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tokenHash` varchar(64) NOT NULL,
	`maskedToken` varchar(32) NOT NULL,
	`label` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `github_tokens_id` PRIMARY KEY(`id`)
);
