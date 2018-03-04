select distinct on (trail.trail_id) * 
from trail
join trail_tags on trail_tags.trail_id = trail.trail_id
where tag_id = any($1);
