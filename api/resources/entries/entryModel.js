'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = exports.schema = new Schema({
  date: {
    type: Date,
    default: new Date()
  },
  severity:  {
    type: String,
    enum: [
      'mild',
      'moderate',
      'severe',
      'very severe'
    ],
    required: true
  },
  notes: String
});

exports.model = mongoose.model('Entry', entrySchema);