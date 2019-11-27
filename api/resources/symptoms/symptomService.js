'use strict'

const { model: Symptom } = require('./symptomModel')

// Helper function to list each of the symptoms in the database
exports.listSymptoms = async () => {
  try {
    const symptoms = await Symptom.find({})
    return symptoms
  } catch (e) {
    throw e
  }
}

// Create a new symptom that will be added to the database
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


exports.getSymptom = async (symptomId) => {
  try {
    const symptom = await Symptom.findById(symptomId)
    return symptom
  } catch (err) {
    console.error(err)
    throw err
  }
}

exports.updateSymptom = async (symptomId, symptomData) => {
  try {
    await Symptom.findByIdAndUpdate(symptomId, symptomData);
    const [nextSymptom] = await exports.listSymptoms({ filter: { _id: symptomId } });
    return nextSymptom;
  } catch (e) {
    throw e;
  }
};