const express = require('express');
const cors = require('cors'); 
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');
const routes = require('./routes/index'); 

const port = process.env.PORT || 5000;
const app = express();

app
.use(bodyParser.json())
.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
})
.use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
.use(cors({ Origin: '*' }))
.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  //user.fineOrCreate({ githubId: profileId}, function (err, user){
  return done(null, profile);
  //});
}
));
passport.serializeUser((user, done) => {
  done(null, user);
});
 
app.get('/', (req, res) => { res.send(req.session.user !== undefined? `You are Logged In! <br><br>Welcome, ${req.session.user.displayName}`: 'Logged Out')});
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });
  


// Initialize DB and Start Server
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit process on DB failure
  } else {
    app.listen(port, () => {
      console.log(`✅ Connected to Database and listening on port ${port}`);
    });
  }
});






/*
// Use routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
  });

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/department', departmentRoute);
app.use('/staff', staffRoute)
app.use('/auth', authRoute)

app.use('/', (req, res) => {
  return res.send(req.session?.user ? `Logged In! <br><br>Welcome, ${req.session.user.displayName}`: 'Logged Out')
});


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
});

*/