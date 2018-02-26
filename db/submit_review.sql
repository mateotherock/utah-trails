insert into review (trail_id, user_id, review_date, review_text)
values ($1, $2, $3, $4);
select review.review_date,
        review.review_text,
        users.first_name,
        users.last_name,
        users.profile_picture,
        rating.rating
from review
join users on users.user_id = review.user_id
join rating on rating.trail_id = review.trail_id
where review.trail_id = $1;