let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port ('player')
const playerRoute = require('../backend/routes/player.route')
const gameRoute = require('../backend/routes/game.route')
const AdminRoute = require('../backend/routes/auth.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/gamer-lobby')));
app.use('/', express.static(path.join(__dirname, 'dist/gamer-lobby')));
app.use('/api', [playerRoute,gameRoute,AdminRoute])

// Create port
const port = process.env.PORT || 8080;


// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req, res) =>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port, () => {
  console.log('Connected to port ' + port)
})