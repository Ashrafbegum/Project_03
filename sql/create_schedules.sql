DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    day INTEGER NOT NULL CHECK ( day >= 1 AND day <= 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);
