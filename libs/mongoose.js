const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.get('mongoose:uri'));
const db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.info("Connected to DB!");
});

const Schema = mongoose.Schema;

// Schemas
const Manager = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstDay: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});

Manager.virtual('managerId')
    .get(function () {
        return this.id;
    });

const ManagerModel = mongoose.model('Manager', Manager);

const Employee = new Schema({
    fname: {
        type: String,
        required: true
    },
    mname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    firstDay: {
        type: Date,
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const EmployeeModel = mongoose.model('Employee', Employee);

module.exports.ManagerModel = ManagerModel;
module.exports.EmployeeModel = EmployeeModel;
