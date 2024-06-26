let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {}).then(() => {
    console.log('Database connected sucessfully ')
},
    error => {
        console.log('Could not connected to database : ' + error)
    }
)

const songRoute = require('./routes/song.route');
const app = express();
app.use(bodyParser.urlencoded(
    { extended: true }
));
app.use(bodyParser.json());
app.use(cors());
// RESTful API root
app.use('/api', songRoute);
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('PORT Connected on ' + port)
})
// Find 404 and hand over to error handler 
app.use((req, res, next) => {
    next(createError(404));
})

// error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})