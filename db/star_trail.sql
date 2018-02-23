insert into rating (user_id, trail_id, rating)
select $1, $2, $3
where not exists (select 1 from rating where user_id = $1 and trail_id = $2);
select trail_id,
        rating
from rating
where user_id = $1;