USE stugamez;

-- Useful indexes for filtering games.
CREATE INDEX critic_score USING BTREE ON metacritic (critic_score);
CREATE INDEX user_score  USING BTREE ON metacritic (user_score);
CREATE INDEX price USING BTREE ON games (price);