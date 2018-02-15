select * from trail
Where difficulty ~* $1 AND general_area ~* $2 AND trail_length < $3 AND elevation_gain < $4;