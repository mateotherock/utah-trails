select tag.tag_name
from tag
join trail_tags on tag.tag_id = trail_tags.tag_id
join trail on trail_tags.trail_id = trail.trail_id
where trail.trail_name = $1; 