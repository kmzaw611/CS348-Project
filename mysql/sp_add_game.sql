USE stugamez;
DROP PROCEDURE IF EXISTS add_game;

DELIMITER $$
CREATE PROCEDURE add_game(IN title VARCHAR(40), IN price DECIMAL(5, 2), IN publisher VARCHAR(40), 
	IN trailer_link VARCHAR(150), IN img_link VARCHAR(150), IN critic_score INTEGER, critic_score_count INTEGER,
    user_score DECIMAL(2, 1), user_score_count INTEGER, IN positive_count INTEGER, IN negative_count INTEGER,
    IN discounted_price DECIMAL(5, 2), IN discounted_percentage DECIMAL(5, 2), IN website VARCHAR(150))
BEGIN
	DECLARE game_id INTEGER DEFAULT 0;
    DECLARE meta_id_foreign INTEGER DEFAULT 0;
    DECLARE metacritic_id_foreign INTEGER DEFAULT 0;
    DECLARE steam_id_foreign INTEGER DEFAULT 0;
    DECLARE discount_id INTEGER DEFAULT 0;
    
    INSERT INTO metadata(trailer_link, img_link) VALUES (trailer_link, img_link);
    SELECT LAST_INSERT_ID() INTO meta_id_foreign;
    
    INSERT INTO metacritic(critic_score, critic_score_count, user_score, user_score_count)
    VALUES (critic_score, critic_score_count, user_score, user_score_count);
    SELECT LAST_INSERT_ID() INTO metacritic_id_foreign;
    
    INSERT INTO steam(positive_count, negative_count) VALUES (positive_count, negative_count);
    SELECT LAST_INSERT_ID() INTO steam_id_foreign;

    INSERT INTO discounts 
    VALUES(game_id, website, discounted_price, discounted_percentage);
    SELECT LAST_INSERT_ID() INTO discount_id;
    
    INSERT INTO games(title, price, publisher, meta_id, metacritic_id, steam_id, discount_id)
    VALUES (title, price, publisher, meta_id_foreign, metacritic_id_foreign, steam_id_foreign, discount_id);

    
END $$
DELIMITER ;