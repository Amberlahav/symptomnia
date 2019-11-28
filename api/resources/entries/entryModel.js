'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const { model: Symptom } = require('../symptoms/symptomModel')

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
  notes: String,
  symptom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Symptom'
  }
});

entrySchema.pre('save', async function (next) {
    const self = this
    const symptom = await Symptom.findById(self.symptom)
    const currentEntries = symptom.entries
    const nextEntries = [].concat(currentEntries, [self])
    await symptom.updateOne({ entries: nextEntries })
    return next()
  })

exports.model = mongoose.model('Entry', entrySchema);