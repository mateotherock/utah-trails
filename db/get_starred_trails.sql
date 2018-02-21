select trail_id,
        rating
from rating
where user_id = $1;