const { Schema, model } = require('mongoose');
const LaHora = require('./time');
const dateFormat = require('../utils/dateFormat');

const dailyreport = new Schema(
  {
    report: {
      type: String,
      required: 'What was done today?',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    Worker: {
      type: String,
      required: true
    },
    reactions: [LaHora]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);



const report = model('dailyreport', dailyreport);

module.exports = report;
