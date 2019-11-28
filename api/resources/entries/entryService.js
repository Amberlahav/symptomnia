'use strict'

const { model: Entry } = require('./entryModel')

// LIST ALL ENTRIES:
exports.listEntries = async () => {
  try {
    const entries = await Entry.find({})
    return entries
  } catch (e) {
    throw e
  }
}

// GET ENTRY BY ID:
exports.getEntry = async (entryId) => {
  try {
    const entry = await Entry.findById(entryId)
    return entry
  } catch (err) {
    console.error(err)
    throw err
  }
}

// CREATE NEW ENTRY:
exports.createEntry = async (entryData) => {
  const entry = new Entry(entryData)
  try {
    const doc = await entry.save()
    return doc
  } catch (e) {
    throw e
  }
}
