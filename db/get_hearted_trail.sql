select exists (select 1 
                from hearted_trails 
                join trail on trail.trail_id = hearted_trails.trail_id
                where hearted_trails.user_id = $2 and trail.trail_name = $1);