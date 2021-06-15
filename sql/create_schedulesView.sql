CREATE OR REPLACE VIEW schedules_view AS
SELECT firstname, lastname, day, start_time, end_time 
FROM users, schedules WHERE users.user_id = schedules.user_id;