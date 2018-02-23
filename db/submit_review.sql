insert into review (trail_id, user_id, review_date, review_text)
values ($1, $2, $3, $4);
select * from review;