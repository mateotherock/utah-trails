select distinct on (review.review_date)
        review.review_date,
        review.review_text,
        users.first_name,
        users.last_name,
        users.profile_picture,
        rating.rating
from review
join users on users.user_id = review.user_id
join trail on trail.trail_id = review.trail_id and review.user_id = users.user_id
join rating on rating.trail_id = review.trail_id
where trail.trail_name = $1
order by review.review_date desc;