'use strict'

const { model: Symptom } = require('./symptomModel')

// LIST ALL SYMPTOMS::
exports.listSymptoms = async () => {
  try {
    const symptoms = await Symptom.find({})
    return symptoms
  } catch (e) {
    throw e
  }
}


// CREATE NEW SYMPTOM:
exports.createSymptom = async (symptomData) => {
  // 1. Create a symptom instance
  const symptom = new Symptom(symptomData)
  try {
    // 2. Save symptom to database
    const doc = await symptom.save()
    // 3. return with created symptom
    return doc
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e
  }
}

// GET SYMPTOM BY ID:
exports.getSymptom = async (symptomId) => {
  try {
    const symptom = await Symptom.findById(symptomId)
    return symptom
  } catch (err) {
    console.error(err)
    throw err
  }
}