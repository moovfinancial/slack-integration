-- CREATE DATABASE IF NOT EXISTS slack_poc_installations;
-- CREATE DATABASE IF NOT EXISTS slack_poc_session;
-- GRANT ALL ON slack_poc_session.* TO 'slack_user'@'%';
-- GRANT ALL ON slack_poc_installations.* TO 'slack_user'@'%';
-- FLUSH PRIVILEGES;
-- USE slack_poc;
-- CREATE TABLE IF NOT EXISTS (...);

use slack_poc_app;

CREATE TABLE slack_team(
	team_id VARCHAR(100),
    installation JSON NOT NULL,
    PRIMARY KEY (team_id)
);


CREATE TABLE slack_team_user(
	team_user_id VARCHAR(100),
    installation JSON NOT NULL,
    channel_id VARCHAR(20) DEFAULT NULL,
    customer_id VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (team_user_id)
    FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
);


CREATE TABLE slack_temp_code(
	nonce_slack VARCHAR(100),
    team_user_id VARCHAR(50) NOT NULL,
    email VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (nonce_slack)
    FOREIGN KEY (team_user_id)
        REFERENCES slack_team_user(team_user_id)
        ON DELETE CASCADE    
);


CREATE TABLE customer(
	customer_id VARCHAR(100),
    email VARCHAR(50),
    PRIMARY KEY (customer)
);