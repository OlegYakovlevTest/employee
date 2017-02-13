var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('./libs/config');

const app = new express();
const compiler = webpack(webpackConfig);
const port = process.env.PORT || config.get('port');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const ManagerModel = require('./libs/mongoose').ManagerModel;
const EmployeeModel = require('./libs/mongoose').EmployeeModel;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.get('jwtSecret')
};

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    ManagerModel.findOne({_id: jwt_payload.id}, (err, manager) => {
        if (manager) {
            next(null, manager);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info("==>  Listening on port %s.", port);
    }
});

app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    ManagerModel.findOne({username}, (err, manager) => {
        if(err) {
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.sendStatus(500);
        }
        if(manager) {
            console.error('Login is used req.body=', req.body);
            return res.status(409).send('Login is used!');
        }
        const managerModel = new ManagerModel({
            username,
            password
        });

        managerModel.save(function (err) {
            if (!err) {
                console.info('manager created');
                const payload = {id: managerModel._id};
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.send({message: "ok", token, manager: managerModel});
            } else {
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.sendStatus(500);
            }
        });
    });
});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    ManagerModel.findOne({username, password}, (err, manager) => {
        if (!manager) {
            res.status(401).json({message:"no such user found"});
        } else {
            const payload = {id: manager.id};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token, manager});
        }
    });
});

app.post('/employee/save', passport.authenticate('jwt', { session: false }), function(req, res){
    const employeeModel = new EmployeeModel(req.body);
    employeeModel.save(function (err) {
        if (!err) {
            console.info('employeeModel created');
            return res.send({message: "ok", employee: employeeModel});
        } else {
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.sendStatus(500);
        }
    });
});

app.put('/employee/update', passport.authenticate('jwt', { session: false }), function(req, res){
    const employeeModel = new EmployeeModel(req.body);
    const upsertData = employeeModel.toObject();
    delete upsertData._id;
    EmployeeModel.update({_id: employeeModel.id}, upsertData, {upsert: true}, function(err) {
        if (!err) {
            console.info('employeeModel updated');
            return res.send({message: "ok"});
        } else {
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.sendStatus(500);
        }
    });
});

app.get('/employee/getall', passport.authenticate('jwt', { session: false }), function(req, res){
    EmployeeModel.find({}, function(err, employees) {
        if (err) {
            res.status(500).json({message:"Server error"});
        } else {
            res.json({message: "ok", employees});
        }
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + '/index.html')
});
