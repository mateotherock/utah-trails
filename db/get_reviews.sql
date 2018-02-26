select review.review_date,
        review.review_text,
        users.first_name,
        users.last_name,
        users.profile_picture,
        rating.rating
from review
join trail on trail.trail_id = review.trail_id
join users on users.user_id = review.user_id
join rating on rating.trail_id = review.trail_id
where trail.trail_name = $1;