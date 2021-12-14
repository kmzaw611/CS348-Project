USE stugamez;

-- Useful indexes for filtering games.
CREATE INDEX critic_score USING BTREE ON metacritic (critic_score);
CREATE INDEX user_score  USING BTREE ON metacritic (user_score);
CREATE INDEX price USING BTREE ON games (price);

-- Useful indexes for getting game info
CREATE HASH INDEX idxGames_id ON games (game_id);
CREATE HASH INDEX idxMeta_id ON metadata (meta_id);
CREATE HASH INDEX idxDsc_id ON discounts (discount_id);
CREATE HASH INDEX idxMetaCrit_id ON metacritic (metacritic_id);
CREATE HASH INDEX idxSteam_id ON steam (steam_id);

--CREATE CLUSTERED INDEX idxMeta_id ON metacritic (meta_id);