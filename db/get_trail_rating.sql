select rating.rating
from rating
join trail on trail.trail_id = rating.trail_id
where trail.trail_name = $1 and rating.user_id = $2;