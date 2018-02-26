require('dotenv').config();
const express = require('express')
        , session = require('express-session')
        , passport = require('passport')
        , Auth0Strategy = require('passport-auth0')
        , massive = require('massive')
        , bodyParser = require('body-parser');

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;

const app = express();
app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(_=> console.log('No'));

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    
    const db = app.get('db');

    const img = "https://robohash.org/me";

    const date = new Date();

    const { sub, name } = profile._json;

    db.find_user([sub]).then(response => {
        if (response[0]) {
            done(null, response[0].user_id)
        } else {
            db.create_user([sub, name, img, date]).then(response => {
                done(null, response[0].user_id)
            })
        }
    });
}));

passport.serializeUser((id, done) => {
    done(null, id);
})

passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_logged_in_user([id]).then(response => {
        done(null, response[0]);
    })
})

returnTo = (req, res, next) => {
    req.session.returnTo = req.query.url;
    next()
}

app.get('/auth', returnTo, passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    // successRedirect: 'http://localhost:3000/#/'
    failureRedirect: '/auth',
    successReturnToOrRedirect: 'http://localhost:3000/#/'
}));

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('Not logged in');
    } else {
        res.status(200).send(req.user);
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/#/');
})

app.get('/api/markers', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_map_markers()
    .then(markers => {res.status(200).send(markers);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/trail/:name', (req, res) => {
    const trailName = req.params.name;
    const dbInstance = req.app.get('db');
    dbInstance.get_trail([trailName])
    .then(trail => {res.status(200).send(trail[0]);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/tags/:name', (req, res) => {
    const trailName = req.params.name;
    const dbInstance = req.app.get('db');
    dbInstance.get_trail_tags([trailName])
    .then(tags => {
        let tagsToSend = tags.map(tagObj => {
            return tagObj.tag_name;
        })
        res.status(200).send(tagsToSend);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/trails', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_trails()
    .then(trails => {res.status(200).send(trails);})
    .catch(err => {res.status(500).send(err);})
})

app.post('/api/trails', (req, res) => {
    let { difficulty, rating, area, length, eGain } = req.body;
    length = Number(length);
    eGain = Number(eGain);
    difficulty = difficulty || "(Easy|Moderate|Hard)";
    area = area || "(Utah County|Grand County|Washington County)";
    length === 0 ? length = 999 : length = length;
    eGain === 0 ? eGain = 99999 : eGain = eGain;
    const dbInstance = req.app.get('db');
    dbInstance.filter_trails([difficulty, area, length, eGain, rating])
    .then(trails => {res.status(200).send(trails);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/addName/', (req, res) => {
    let { id, firstName, lastName } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.add_name([id, firstName, lastName])
    .then(user => {res.status(200).send(user)})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.get('/api/heartedTrails/:id', (req, res) => {
    let { id } = req.params;
    const dbInstance = req.app.get('db');
    dbInstance.get_hearted_trails([id])
    .then(trailIds => {res.status(200).send(trailIds)})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/heartTrail', (req, res) => {
    let { user_id, trail_id } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.heart_trail([user_id, trail_id])
    .then(trailIds => {res.status(200).send(trailIds)})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/unheartTrail', (req, res) => {
    let { user_id, trail_id } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.unheart_trail([user_id, trail_id])
    .then(trailIds => {res.status(200).send(trailIds)})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.get('/api/starredTrails/:id', (req, res) => {
    let { id } = req.params;
    const dbInstance = req.app.get('db');
    dbInstance.get_starred_trails([id])
    .then(ratings => {res.status(200).send(ratings)})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/starTrail', (req, res) => {
    let { user_id, trail_id, rating } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.star_trail([user_id, trail_id, rating])
    .then(ratings => {res.status(200).send(ratings)})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/trailRating', (req, res) => {
    let { trailName, userId } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.get_trail_rating([trailName, userId])
    .then((rating) => {
        if (rating[0]) {
            res.status(200).send(rating)
        } else {
            res.status(200).send([{rating:0}])
        }})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.get('/api/overallTrailRating/:name', (req, res) => {
    let { name } = req.params;
    const dbInstance = req.app.get('db');
    dbInstance.get_overall_trail_rating([name])
    .then(rating => {res.status(200).send(rating);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.get('/api/trailRatings', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_overall_star_trails()
    .then(avgRatings => {res.status(200).send(avgRatings);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/submitReview', (req, res) => {
    let { userId, trailId, reviewText } = req.body;
    const date = new Date();
    const dbInstance = req.app.get('db');
    dbInstance.submit_review([trailId, userId, date, reviewText])
    .then(reviews => {res.status(200).send(reviews);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.post('/api/heartedTrail',(req, res) => {
    let { trailName, userId } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.get_hearted_trail([trailName, userId])
    .then(boolean => {res.status(200).send(boolean);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.get('/api/getReviews/:name', (req, res) => {
    let { name } = req.params;
    const dbInstance = req.app.get('db');
    dbInstance.get_reviews([name])
    .then(reviews => {res.status(200).send(reviews);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})
