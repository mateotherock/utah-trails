select avg(rating.rating),
        trail.trail_id,
        trail.trail_name,
        trail.trail_img,
        trail.general_area,
        trail.difficulty
from rating
join trail on trail.trail_id = rating.trail_id
where trail.trail_id = 4
group by trail.trail_id;