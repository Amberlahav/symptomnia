'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Map to fields in the DB
const symptomSchema = exports.schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  }]
})

symptomSchema.pre('find', function() {
  this.populate('entries');
});

exports.model = mongoose.model('Symptom', symptomSchema)
