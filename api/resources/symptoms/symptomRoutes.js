'use strict'

const express = require('express')
const router = express.Router()

const symptomService = require('./symptomService')

// GET /symptoms/
router.route('/')
  .get(async (req, res, next) => {
    try {
      // 1. Fetch all symptoms from database
      const symptoms = await symptomService.listSymptoms()
      // 2. Respond with list of symptoms
      res.status(200).send({
        data: symptoms
      })
    } catch (e) {
      // 3. If error, send to the error handler
      next(e)
    }
  })

// POST /symptoms/
router.route('/')
  .post(async (req, res, next) => {
    // 1. Get data from request body
    const { body } = req;
    try {
      // 2. Create symptom from data
      const symptom = await symptomService.createSymptom(body)
      // 3. Respond with created symptom
      res.status(201).send({
        data: [symptom]
      })
    } catch (e) {
      // 4. If error, send to the error handler
      next(e)
    }
  })

exports.router = router
