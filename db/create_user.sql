insert into users
(date_joined, user_overview, profile_picture, first_name, last_name, email,	auth_id, user_name)
values
($4, null, $3, null, null, null, $1, $2)
RETURNING *;