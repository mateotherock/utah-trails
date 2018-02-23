select avg(rating.rating)
from rating
join trail on trail.trail_id = rating.trail_id
where trail.trail_name = $1;