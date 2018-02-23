select trail_id,
        avg(rating)
from rating
group by trail_id;