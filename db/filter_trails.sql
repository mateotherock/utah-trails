select * from trail where difficulty ~* $1 AND general_area ~* $2 AND trail_length < $3 AND elevation_gain < $4 AND trail_id in (select trail_id
from rating
group by trail_id
having avg(rating) >= $5);