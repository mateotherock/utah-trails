select trail.trail_name
from trail
join hearted_trails on hearted_trails.trail_id = trail.trail_id
where hearted_trails.user_id = $1;