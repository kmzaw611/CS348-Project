USE stugamez;

DROP TABLE IF EXISTS discounts;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS metacritic;
DROP TABLE IF EXISTS steam;
DROP TABLE IF EXISTS metadata;
DROP TABLE IF EXISTS wish_list;

CREATE TABLE metacritic (
	metacritic_id INTEGER AUTO_INCREMENT,
    critic_score INTEGER,
    critic_score_count INTEGER,
    user_score DECIMAL(2, 1),
    user_score_count INTEGER,
    PRIMARY KEY (metacritic_id)
);

CREATE TABLE steam (
	steam_id INTEGER AUTO_INCREMENT,
    positive_count INTEGER,
    negative_count INTEGER,
    PRIMARY KEY (steam_id)
);

CREATE TABLE metadata (
	meta_id INTEGER AUTO_INCREMENT,
    trailer_link VARCHAR(150),
    img_link VARCHAR(150),
    PRIMARY KEY (meta_id)
);

CREATE TABLE games (
	game_id INTEGER AUTO_INCREMENT,
    metacritic_id INTEGER,
    steam_id INTEGER,
    meta_id INTEGER,
    title VARCHAR(40),
    price DECIMAL(5, 2),
    publisher VARCHAR(40),
    PRIMARY KEY (game_id),
    FOREIGN KEY (metacritic_id) REFERENCES metacritic(metacritic_id) ON DELETE CASCADE,
    FOREIGN KEY (steam_id) REFERENCES steam(steam_id) ON DELETE CASCADE,
    FOREIGN KEY (meta_id) REFERENCES metadata(meta_id) ON DELETE CASCADE
);

CREATE TABLE discounts (
	game_id INTEGER,
    website VARCHAR(150),
    discounted_price DECIMAL(5, 2),
    discounted_percentage DECIMAL(5, 2),
    PRIMARY KEY (game_id, website),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE wish_list (
	game_id INTEGER,
    title VARCHAR(40),
    PRIMARY KEY (game_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);

-- SHOW TABLES;
-- DESCRIBE game;
-- DESCRIBE metadata;
-- DESCRIBE steam;
-- DESCRIBE metacritic;
-- DESCRIBE discounts;
-- DESCRIBE wish_list;